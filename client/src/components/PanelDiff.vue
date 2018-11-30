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
          {{ diffOldCur }}
          </div>
          <!-- Old: {{ oldText }}<br>
          Current: {{ currentText }} -->
        </v-layout>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { strToMtx, diff } from '@/plugins/diff'

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
      let old = strToMtx(this.oldText, ' ')
      let cur = strToMtx(this.currentText, ' ')
      let emptyOld = old.toString() === ''

      let emptyCur = cur.toString() === ''
      console.info('old:', emptyOld)
      console.table(old)
      console.info('cur:', emptyCur)
      console.table(cur)
      let dif = (emptyOld && emptyCur) ? null : diff(old, cur)
      console.log('dif=', dif)
      // let delta = JSON.parse(JSON.stringify(old)); //copy `old`
      // then go through dif and change

      // Transform the matrix `old` into a lined text
      let res = `<table>`
      if (!emptyOld) {
        console.log('Old is empty?', emptyOld)
        old.forEach((line, idx) => {
          res += `<tr><td class="line">${line}</td>${line.split(' ').map(col => '<td>' + col + '</td>')}</tr>`
        })
      }
      return `${res}</table>`
    }
  }
}
</script>

<style lang="scss" scoped>
  .plus { //green accent-3
    background-color: #80ff80;
    color: #0f0;
  }

  .minus { //red accent-3
    background-color: #ff8080;
    color: #f00;
  }

  #diff {
    margin: .5rem;
    min-height: 9rem;
  }
</style>
