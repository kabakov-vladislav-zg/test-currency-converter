import axios from 'axios'

export default {
  _accessKey: 'a735ab2ddd5c0b3a7bda6b268029a3e9',
  _timeout: 1000,

  async _sleep(ms = this._timeout) { // обход Rate Limits в бесплатном тарифе currencylayer
    return new Promise(resolve => setTimeout(resolve, ms))
  },

  async _makeRequest(endpoint, parameters = '', timeout = 0) {
    await this._sleep(timeout)
    let request = await axios.get(`http://api.currencylayer.com/${endpoint}?access_key=${this._accessKey}${parameters}`)
    if(request.data.success) {
      return request
    } else if(timeout < 10000) {
      return await this._makeRequest(endpoint, parameters, timeout + 2000)
    }
  },

  async _getCurrencies(mockup) {
    let result
    if(mockup) {
      await this._sleep()
      result = await import('../assets/mockup/list')
    } else {
      result = await this._makeRequest('list')
    }
    console.log(result)
    return result.data.currencies
  },
  async _getConversions(mockup) {
    let result
    if(mockup) {
      await this._sleep()
      result = await import('../assets/mockup/live')
    } else {
      result = await this._makeRequest('live')
    }
    console.log(result)
    return result.data.quotes
  },
  async _getHistoricalConversions(mockup) {
    let result = {}
    if(mockup) {
      let request = await import('../assets/mockup/historical')
      for (let day of request.data) {
        await this._sleep()
        result[day.date] = day.quotes
      }
    } else {
      let date = new Date()
      for (let i = 10; i > 0; i--) { // обход запрета на Time-Frame Queries в бесплатном тарифе currencylayer
        await this._sleep()
        let dateCopy = new Date(date)
        dateCopy.setDate(date.getDate() - i)
        dateCopy = dateCopy.toLocaleDateString('en-CA', {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        let request = await this._makeRequest('historical', `&date=${dateCopy}`)
        if(request.data.success) {
          result[request.data.date] = request.data.quotes
        }
        console.log(request)
      }
    }
    console.log(result)
    return result
  },

  async getData(name, mockup) {
    const method = '_get' + name[0].toUpperCase() + name.slice(1)
    if(method in this) {
      return await this[method](mockup)
    }
  },
}