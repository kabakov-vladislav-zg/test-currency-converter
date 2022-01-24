<template>
  <div class="chart-conversion">
    <template v-if="historicalConversions.status === 'success'">
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
    <RequestStatus
      v-else
      :status="historicalConversions.status"
      :height="'18.75rem'"
    />
  </div>
</template>

<script>
import {mapGetters, mapState} from 'vuex'
import ChartConversionTable from "./ChartConversionTable";
import ChartConversionChart from "./ChartConversionChart";
import RequestStatus from "./RequestStatus";
export default {
  name: "ChartConversion",
  components: {RequestStatus, ChartConversionChart, ChartConversionTable},
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
    ...mapState('currencies', {
      historicalConversions: state => state.historicalConversions
    })
  }
}
</script>

<style scoped>

</style>