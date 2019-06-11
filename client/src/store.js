import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    old: '',
    current: '',
    forecast: ''
  },
  getters: {
    old: state => state.old,
    current: state => state.current,
    forecast: state => state.forecast
  },
  mutations: {
    updateOld (state, newOld) {
      state.old = newOld
    },
    updateCurrent (state, newCurrent) {
      state.current = newCurrent
    },
    updateForecast (state, newForecast) {
      state.forecast = newForecast
    }
  }
})
