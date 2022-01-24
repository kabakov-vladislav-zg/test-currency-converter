import api from '../../api/currencies'

const mockup = process.env.NODE_ENV !== 'production'

const getConversion = (data, from, to) => {
  let conversion
  if(from === to) {
    conversion = 1
  } else if(from === 'USD') {
    conversion = data['USD' + to]
  } else if(to === 'USD') {
    conversion = 1 / data['USD' + from]
  } else {
    conversion = data['USD' + to] / data['USD' + from]
  }
  return +conversion.toFixed(6)
}

const state = () => ({
  currencies: {
    status: 'unloaded',
    data: null
  },
  conversions: {
    status: 'unloaded',
    data: null
  },
  historicalConversions: {
    status: 'unloaded',
    data: []
  },

  mockup
})

const mutations = {
  setStatus(state, { name, status }) {
    state[name].status = status
  },
  setData(state, { name, data }) {
    state[name].data = data
  }
}

const actions = {
  initData({state, dispatch}, name) {
    if(state[name].status !== 'unloaded') {
      return
    }
    dispatch('setData', {
      name,
      mockup: state.mockup
    })
  },

  async setData({commit}, { name, mockup }) {
    commit('setStatus', {name, status: 'onload'})
    try {
      const data = await api.getData(name, mockup)
      commit('setStatus', {
        name,
        status: 'success'
      })
      commit('setData', {
        name,
        data
      })
    } catch(err) {
      commit('setStatus', {
        name,
        status: 'error'
      })
    }
  },
}

const getters = {
  currencies(state) {
    return state.currencies.data
  },
  conversion(state, getters, rootState) {
    if(!state.conversions.data) return

    return getConversion(state.conversions.data, rootState.settings.from, rootState.settings.to)
  },
  conversionChart(state, getters, rootState) {
    const chart = {}
    for (const item of state.historicalConversions.data) {
      chart[item.time] = getConversion(item.data, rootState.settings.from, rootState.settings.to)
    }
    return chart
  }
}



export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}