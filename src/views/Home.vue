<template>
  <div class="home row">
    <div class="row__col home__currency-converter">
      <div class="card home__card">
        <h1 class="h1">Конвертация валют</h1>
        <ConverterCurrency />
      </div>
    </div>
    <div
      v-if="listPrices"
      class="row__col home__price-list"
    >
      <section class="card home__card">
        <h2 class="h2">Список стоимостей</h2>
        <ListPrices />
      </section>
    </div>
    <div
      v-if="chartConversion"
      class="row__col home__conversion-history"
    >
      <section class="card home__card">
        <h2 class="h2">История курса конвертации</h2>
        <ChartConversion />
      </section>
    </div>
  </div>
</template>

<script>
import ConverterCurrency from "../components/ConverterCurrency";
import ListPrices from "../components/ListPrices";
import ChartConversion from "../components/ChartConversion";
export default {
  name: 'Home',
  components: {
    ChartConversion,
    ListPrices,
    ConverterCurrency
  },
  computed: {
    listPrices() {
      return this.$store.state.settings.listPrices
    },
    chartConversion() {
      return this.$store.state.settings.chartConversion.active
    },
  }
}
</script>

<style scoped lang="scss">
.home__currency-converter {
  width: 100%;
}
.home__price-list, .home__conversion-history {
  width: 100%;
   @media (min-width: 768px) {
     width: 50%;
   }
}
.home__card {
  height: 100%;
}
</style>
