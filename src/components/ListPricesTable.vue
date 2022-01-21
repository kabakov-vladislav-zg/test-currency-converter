<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">{{ from }}</th>
        <th scope="col">{{ to }}</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="price in prices"
        :key="price"
      >
        <td>{{ price }}</td>
        <td>{{ getResultValue(price) }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "ListPricesTable",
  props: {
    from: {
      type: String,
      required: true
    },
    to: {
      type: String,
      required: true
    },
    conversion: {
      type: Number,
      required: true
    },
    prices: {
      type: Array,
      default() {
        return [1, 5, 10, 25, 50, 100, 500, 1000, 5000]
      }
    },
  },

  methods: {
    getResultValue(initialValue) {
      const value = this.conversion * initialValue
      return +value.toFixed(2)
    }
  }
}
</script>

<style scoped>
.table {
  width: 100%;
  text-align: left;
}
</style>