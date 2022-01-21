<template>
  <table class="table">
    <thead>
    <tr>
      <th scope="col">день</th>
      <th scope="col">{{ to }} / {{ from }}</th>
    </tr>
    </thead>
    <tbody>
    <tr
      v-for="item in conversionChart"
      :key="item.time + item.conversion"
    >
      <td>{{ item.time }}</td>
      <td>{{ item.conversion }}</td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "ChartConversionTable",
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
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>

</style>