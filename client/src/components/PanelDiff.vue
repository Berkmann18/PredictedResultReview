<template>
  <div
    fill-height
  >
    <v-toolbar
      color="cyan"
      class="white--text"
    >
      <v-toolbar-title>
        {{title}}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>refresh</v-icon>
      </v-btn>
    </v-toolbar>
    <!-- Perhaps have it line-numbered -->
    <v-card>
      <v-container fluid>
        <v-layout row>
          <v-flex d-flex xs1>
            <v-layout column>
              <span
                v-for="line in lineCount"
                :key="line"
                >
                {{ line }}
              </span>
            </v-layout>
          </v-flex>
          <div
            id="diff"
            xs11
          >
          <table id="diffTab" cellspacing="0" cellpadding="4px">
            <tr
              v-for="row in diffOldCur"
              :key="row.idx"
              :class="{ plus: row.type === 'add', minus: row.type === 'remove' }">
              <td>
                {{row.idx}}
              </td>
              <td>
                {{row.line}}
              </td>
            </tr>
          </table>
          </div>
          <!-- Old: {{ oldText }}<br>
          Current: {{ currentText }} -->
        </v-layout>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { diff } from 'just-diff' // '@/plugins/diff'
import { strToMtx } from '@/plugins/utils'

export default {
  name: 'PanelDiff',
  props: {
    title: String
  },
  data () {
    return {
      text: ''
    }
  },
  computed: {
    textZone: {
      get () {
        return this.text
      },
      set (value) {
        this.text = value
      }
    },
    lineCount () {
      return this.text.length ? this.text.split(/\r\n|\r|\n/).length : 0
    },
    oldText () {
      // console.log('Old')
      // console.dir(this.$store.getters.old.split(/\n/g))
      return this.$store.getters.old// .replace(/\r\n|\r|\n/g, '\n')
    },
    currentText () {
      return this.$store.getters.current// .replace(/\r\n|\r|\n/g, '<br>')
    },
    diffOldCur () {
      const old = strToMtx(this.oldText, ' ')
      const cur = strToMtx(this.currentText, ' ')
      let emptyOld = old.toString() === ''

      let emptyCur = cur.toString() === ''
      // console.info('old:', emptyOld)
      console.table(old)
      // console.info('cur:', emptyCur)
      console.table(cur)

      const dif = (emptyOld && emptyCur) ? null : diff(old, cur)
      console.log('dif=', dif)
      // let delta = JSON.parse(JSON.stringify(old)); //copy `old`
      // then go through dif and change

      // Transform the matrix `old` into a lined text
      let res = []
      if (!emptyOld) {
        res = old.map((line, idx) => {
          // console.log('line=', line, '#', idx)
          // res += `<tr><td class="line">${idx}</td>${line.length ? line/* .split(' ') */.map(col => '<td>' + col + '</td>') : `<td>${line}</td>`}</tr>`
          return {
            idx,
            line: line.join(' '),
            type: 'n/a'
          }
        })

        for (let d of dif) {
          // console.log('d=', d)

          let line = cur[d.path[0]]
          console.log('line=', line)
          // line[d.path[1]] = `<em>${d.value}</em>`

          let data = {
            idx: ` ${d.path[0]}`,
            line: line ? line.join(' ') : '', // d.value,
            type: d.op
          }
          if (d.op === 'replace') {
            res.forEach(line => {
              // eslint-disable-next-line eqeqeq
              if (line.idx == d.path[0]) line.type = 'remove'
            })
            data.type = 'add'
          }
          if (d.op === 'remove') {
            res.forEach(line => {
              // eslint-disable-next-line eqeqeq
              if (line.idx == d.path[0]) line.type = 'remove'
            })
            continue
          }
          res.push(data)
        }

        res = res.sort((a, b) => a.idx - b.idx)
      }
      console.log('res=', res)
      return res
    }
  }
}
</script>

<style lang="scss" scoped>
  .plus { //green accent-3
    background-color:#f0fff4;
    color: #22863a;
  }

  .minus { //red accent-3
    background-color: #ffeef0;
    color: #b31d28;
  }

  #diff {
    margin: .5rem;
    min-height: 9rem;
  }

  #diffTab {
    border: 1px solid #000;
    td {
      border: 1px solid #000;
    }
  }
</style>
