<template>
  <line-chart :curve="false" :discrete="true" :min="min" :max="max" :data="conversionChart"></line-chart>
</template>

<script>
export default {
  name: "ChartConversionChart",
  props: {
    from: {
      type: String,
      required: true
    },
    to: {
      type: String,
      required: true
    },
    conversionChart: {
      type: Object,
      required: true
    }
  },
  computed: {
    min() {
      return +(Math.min(...Object.values(this.conversionChart)) * .99).toFixed(4)
    },
    max() {
      return +(Math.max(...Object.values(this.conversionChart)) * 1.01).toFixed(4)
    }
  }
}
</script>

<style scoped>

</style>