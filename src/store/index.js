import { createStore } from 'vuex'
import currencies from './modules/currencies'
import settings from './modules/settings'
import createPersistedState from "vuex-persistedstate"
import * as Cookies from "js-cookie"

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  state: {
    modal: false
  },

  mutations: {
    toggleModal(state, status) {
      state.modal = status
    }
  },

  modules: {
    currencies,
    settings
  },

  plugins: [
    createPersistedState({
      storage: {
        getItem: (key) => Cookies.get(key),
        setItem: (key, value) => Cookies.set(key, value, { expires: 7 }),
        removeItem: (key) => Cookies.remove(key),
      },
      paths: [
        'settings.darkTheme',
        'settings.chartConversion',
        'settings.listPrices',
        'settings.from',
        'settings.to',
        'settings.last',
      ]
    })
  ],

  strict: debug
})
