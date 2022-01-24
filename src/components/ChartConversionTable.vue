<template>
  <table class="table">
    <thead>
    <tr>
      <th scope="col">день</th>
      <th scope="col">{{ from }} / {{ to }}</th>
    </tr>
    </thead>
    <tbody>
    <tr
      v-for="(item, name) in conversionChart"
      :key="name + item.conversion"
    >
      <td>{{ name }}</td>
      <td>{{ item }}</td>
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
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>