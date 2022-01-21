export default {
  async getData(name, mockup) {
    if(name in this.getters) {
      return await this.getters[name](mockup)
    } else {

    }
  },
  getters: {
    async currencies(mockup) {
      if(mockup) {
        const list = await import('../assets/mockup/list')
        return list.default.currencies
      }
    },
    async conversions(mockup) {
      if(mockup) {
        const list = await import('../assets/mockup/live')
        return list.default.quotes
      }
    },
    async historicalConversions(mockup) {
      if(mockup) {
        const list = await import('../assets/mockup/historical')
        const historical = []
        for (const data of list.default) {
          historical.push({
            data: data.quotes,
            time: data.date
          })
        }
        return historical
      }
    },
  }
}