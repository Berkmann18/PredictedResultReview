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
          <lined-v-textarea
            :disabled="disable"
            :nowrap="nowrap === 'true'"
            :styles="{ height: `100%`, width: `100%`, resize }"
            v-model="content"
          ></lined-v-textarea>
        </v-layout>
        <!-- <span>Line count: {{lineCount}}</span> -->
      </v-container>
    </v-card>
  </div>
</template>

<script>
import LinedVTextarea from './LinedVTextarea.vue'

export default {
  name: 'LinedPanel',
  components: {
    LinedVTextarea
  },
  props: {
    title: String
  },
  data () {
    return {
      text: 'Lorem'
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
    }
  }
}
</script>
