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
                {{line}}
              </span>
            </v-layout>
          </v-flex>
          <div
            id="diff"
            xs11
          ></div>
        </v-layout>
      </v-container>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'PanelDiff',
  props: {
    title: String
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
