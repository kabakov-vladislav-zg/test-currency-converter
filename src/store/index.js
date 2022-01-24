import { createStore } from 'vuex'
import currencies from './modules/currencies'
import settings from './modules/settings'

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

  strict: debug
})
