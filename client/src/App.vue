<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Predirected Result Review</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-content>
      <v-container fluid grid-list-sm>
        <v-layout justify-center row fill-height>
          <v-flex d-flex xs12>
            <v-layout column wrap>
              <v-flex d-flex>
                <panel title="Old" />
              </v-flex>
              <v-flex d-flex>
                <panel title="Current" />
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex d-flex xs12>
            <v-layout column wrap>
              <v-flex d-flex>
                <panel title="Forecast" />
              </v-flex>
              <v-flex d-flex>
                <panel-diff title="Old/Current Difference" />
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Panel from './components/Panel'
import PanelDiff from './components/PanelDiff'
// import LinedPanel from './components/LinedPanel'

export default {
  name: 'App',
  components: {
    Panel,
    PanelDiff
  },
  data () {
    return {
      content: '',
      disable: false,
      height: 300,
      nowrap: 'false',
      resize: 'both',
      validateName: 'none',
      width: 450
    }
  }
}
</script>
