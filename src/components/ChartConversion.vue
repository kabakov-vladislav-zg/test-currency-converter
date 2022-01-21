<template>
  <div class="chart-conversion">
    <template v-if="conversionChart">
      <ChartConversionChart
        v-if="chartConversion.view === 'chart'"
        :from="from"
        :to="to"
        :conversionChart="conversionChart"
      />
      <ChartConversionTable
        v-else
        :from="from"
        :to="to"
        :conversionChart="conversionChart"
      />
    </template>
  </div>
</template>

<script>
import {mapGetters, mapState} from 'vuex'
import ChartConversionTable from "./ChartConversionTable";
import ChartConversionChart from "./ChartConversionChart";
export default {
  name: "ChartConversion",
  components: {ChartConversionChart, ChartConversionTable},
  mounted() {
    this.$store.dispatch('currencies/initData', 'historicalConversions')
  },

  computed: {
    ...mapGetters('currencies', {
      conversionChart: 'conversionChart'
    }),
    ...mapState('settings', {
      from: state => state.from,
      to: state => state.to,
      chartConversion: state => state.chartConversion,
    }),
  }
}
</script>

<style scoped>

</style>