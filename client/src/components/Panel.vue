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
        <!-- @todo Check if this renders properly, maybe check out https://github.com/Shenmin-Z/lined-textarea -->
        <span
          v-for="line in lineCount"
          :key="line"
          >
        </span>
        <v-textarea
          v-model="text"
        ></v-textarea>
      </v-container>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'Panel',
  props: {
    title: String
  },
  data () {
    return {
      text: ''
    }
  },
  computed: {
    lineCount: () => {
      return this.text.length ? this.text.split(/\r\n|\r|\n/).length : 0;
    }
  }
}
</script>
