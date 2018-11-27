<template>
  <div
    fill-height
  >
    <v-toolbar
      color="cyan"
      class="white--text"
    >
      <v-toolbar-title>
        {{ title }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>refresh</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card>
      <v-container fluid>
        <!-- @todo Check if this renders properly, maybe check out https://github.com/Shenmin-Z/lined-textarea (cf. my fork) -->
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
          <v-textarea
            v-model="textZone"
            xs11
          ></v-textarea>
        </v-layout>
        <!-- <span>Line count: {{lineCount}}</span> -->
      </v-container>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'Panel',
  props: {
    title: String,
    storeField: String
  },
  data () {
    return {
      text: '',
      field: this.storeField.charAt(0).toUpperCase() + this.storeField.substr(1)
    }
  },
  computed: {
    textZone: {
      get () {
        return this.text // this.$store.state.old|current|forecast
      },
      set (value) {
        this.text = value
        console.log(`"Updating storeField=${this.field} with value=${value}`, this.$store.getters[this.storeField])
        this.$store.commit(`update${this.field}`, value)
      }
    },
    lineCount () {
      return this.text.length ? this.text.split(/\r\n|\r|\n/).length : 0
    }
  }
}
</script>
