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
                <panel
                  title="Old"
                  storeField="old"
                />
              </v-flex>
              <v-flex d-flex>
                <panel
                  title="Current"
                  storeField="current"
                />
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex d-flex xs12>
            <v-layout column wrap>
              <v-flex d-flex>
                <panel
                  title="Forecast"
                  storeField="forecast"
                />
              </v-flex>
              <v-flex d-flex>
                <panel-diff
                  title="Old/Current Difference"
                />
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
  },
  computed: {
    old () {
      return this.$store.state.old
    },
    current () {
      return this.$store.state.current
    },
    forecast () {
      return this.$store.sate.forecast
    }
  },
  methods: {
    updateOld (newOld) {
      this.$store.commit('updateOld', newOld) // calls the mutation updateOld()
    },
    updateCurrent (newCurrent) {
      this.$store.commit('updateCurrent', newCurrent)
    },
    updateForecast (newForecast) {
      this.$store.commit('updateForecast', newForecast)
    }
  }
}
</script>
