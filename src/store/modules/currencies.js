import api from '../../api/currencies'


const mockup = process.env.NODE_ENV !== 'production'  // флаг для загрузки мокнутых данных в development
                                                      // в бесплатном тарифе currencylayer ограничение 250 запросов/мес

const getConversion = (data, from, to) => { // обход конверсии только относительно USD в бесплатном тарифе currencylayer
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
    data: null
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

  async setData({state, commit}, { name, mockup }) {
    if(state[name].status === 'onload') {
      return
    }
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
  conversion(state, getters, rootState) {
    if(!state.conversions.data) return

    return getConversion(state.conversions.data, rootState.settings.from, rootState.settings.to)
  },
  conversionChart(state, getters, rootState) {
    const chart = {}
    const data = state.historicalConversions.data
    for (const day in data) {
      let date = new Date(day)
      chart[date.toLocaleDateString('ru-RU', {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
      })] = getConversion(data[day], rootState.settings.from, rootState.settings.to)
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