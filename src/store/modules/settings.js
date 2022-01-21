const state = () => ({
  darkTheme: false,
  chartConversion: {
    active: true,
    view: 'chart'
  },

  from: 'RUB',
  to: 'EUR',

  last: {
    from: [
      'RUB',
      'EUR',
      'USD'
    ],
    to: [
      'USD',
      'EUR',
      'RUB'
    ],
  }
})

const mutations = {
  toggleTheme(state) {
    state.darkTheme = !state.darkTheme
  },
  setCurrentCurrency(state, {position, item}) {
    state[position] = item
  },
  setLastCurrencies(state, {position, item}) {
    state.last[position].unshift(item)
    state.last[position].pop()
  }
}

const actions = {
  setCurrentCurrency({state, commit}, {position, item}) {
    commit('setCurrentCurrency', { position, item })
    if(!state.last[position].includes(item)) {
      commit('setLastCurrencies', { position, item })
    }
  },
  swap({state, dispatch}) {
    const from = state.from
    const to = state.to

    dispatch('setCurrentCurrency', {position: 'from', item: to})
    dispatch('setCurrentCurrency', {position: 'to', item: from})
  }
}

const getters = {

}



export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}