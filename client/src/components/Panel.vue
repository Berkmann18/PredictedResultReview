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
    <!-- Perhaps have a line-numbered v-textarea -->
    <v-card>
      <v-container fluid>
        <v-textarea>
        </v-textarea>
      </v-container>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'Panel',
  props: {
    title: String
  }
}
</script>
