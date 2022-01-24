const state = () => ({
  darkTheme: false,
  chartConversion: {
    active: true,
    view: 'chart'
  },
  listPrices: true,

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
  toggleTheme(state, value) {
    state.darkTheme = value
  },
  setCurrentCurrency(state, {position, item}) {
    state[position] = item
  },
  setLastCurrencies(state, {position, item}) {
    state.last[position].unshift(item)
    state.last[position].pop()
  },
  toggleChartConversion(state, value) {
    state.chartConversion.active = value
  },
  toggleChartConversionView(state, value) {
    state.chartConversion.view = value
  },
  toggleListPrices(state, value) {
    state.listPrices = value
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