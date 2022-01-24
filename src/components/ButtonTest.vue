<template>
  <button @click="setData">Загрузить реальные данные</button>
</template>

<script>
export default {
  name: "ButtonTest",
  methods: {
    setData() {
      this.$store.dispatch('currencies/setData', {
        name: 'currencies',
        mockup: false
      })
      this.$store.dispatch('currencies/setData', {
        name: 'conversions',
        mockup: false
      })
      this.$store.dispatch('currencies/setData', {
        name: 'historicalConversions',
        mockup: false
      })
    }
  },
}
</script>

<style scoped lang="scss">

</style>