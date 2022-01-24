import axios from 'axios'
const accessKey = 'a735ab2ddd5c0b3a7bda6b268029a3e9'

export default {
  async getData(name, mockup) {
    if(name in this.getters) {
      return await this.getters[name](mockup)
    } else {

    }
  },
  getters: {
    async currencies(mockup) {
      let list
      if(mockup) {
        list = await import('../assets/mockup/list')
        return list.default.currencies
      } else {
        list = await axios.get('http://api.currencylayer.com/list?access_key=' + accessKey)
        console.log(list)
        return list.data.currencies
      }
    },
    async conversions(mockup) {
      let list
      if(mockup) {
        list = await import('../assets/mockup/live')
        return list.default.quotes
      } else {
        list = await axios.get('http://api.currencylayer.com/live?access_key=' + accessKey)
        console.log(list)
        return list.data.quotes
      }
    },
    async historicalConversions(mockup) {
      let list
      if(mockup) {
        list = await import('../assets/mockup/historical')
        const historical = []
        for (const data of list.default) {
          historical.push({
            data: data.quotes,
            time: data.date
          })
        }
        return historical
      } else {
        let date = new Date()
        await sleep(1000)
        let day9 = await axios.get('http://api.currencylayer.com/historical?date=' + getDateAgo(date, 9) + '&access_key=' + accessKey)
        await sleep(1000)
        let day8 = await axios.get('http://api.currencylayer.com/historical?date=' + getDateAgo(date, 8) + '&access_key=' + accessKey)
        await sleep(1000)
        let day7 = await axios.get('http://api.currencylayer.com/historical?date=' + getDateAgo(date, 7) + '&access_key=' + accessKey)
        await sleep(1000)
        let day6 = await axios.get('http://api.currencylayer.com/historical?date=' + getDateAgo(date, 6) + '&access_key=' + accessKey)
        await sleep(1000)
        let day5 = await axios.get('http://api.currencylayer.com/historical?date=' + getDateAgo(date, 5) + '&access_key=' + accessKey)
        await sleep(1000)
        let day4 = await axios.get('http://api.currencylayer.com/historical?date=' + getDateAgo(date, 4) + '&access_key=' + accessKey)
        await sleep(1000)
        let day3 = await axios.get('http://api.currencylayer.com/historical?date=' + getDateAgo(date, 3) + '&access_key=' + accessKey)
        await sleep(1000)
        let day2 = await axios.get('http://api.currencylayer.com/historical?date=' + getDateAgo(date, 2) + '&access_key=' + accessKey)
        await sleep(1000)
        let day1 = await axios.get('http://api.currencylayer.com/historical?date=' + getDateAgo(date, 1) + '&access_key=' + accessKey)
        await sleep(1000)
        let day0 = await axios.get('http://api.currencylayer.com/historical?date=' + getDateAgo(date) + '&access_key=' + accessKey)
        list = [
          day9,
          day8,
          day7,
          day6,
          day5,
          day4,
          day3,
          day2,
          day1,
          day0,
        ]
        console.log(list)
        const historical = []
        for (const data of list) {
          historical.push({
            data: data.data.quotes,
            time: data.data.date
          })
        }
        return historical

        function getDateAgo(date, days = 0) {
          let dateCopy = new Date(date);

          dateCopy.setDate(date.getDate() - days)

          dateCopy = dateCopy.toLocaleDateString('en-CA', {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })
          console.log(dateCopy)

          return dateCopy
        }
        async function sleep(ms) {
          return new Promise(resolve => setTimeout(resolve, ms));
        }
      }
    },
  }
}