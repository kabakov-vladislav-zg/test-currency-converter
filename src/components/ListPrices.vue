<template>
  <div class="list-prices row">
    <template v-if="conversion">
      <div class="row__col list-prices__col">
        <ListPricesTable
          :from="from"
          :to="to"
          :conversion="conversion"
        />
      </div>
      <div class="row__col list-prices__col">
        <ListPricesTable
          :from="to"
          :to="from"
          :conversion="1 / conversion"
        />
      </div>
    </template>
  </div>
</template>

<script>
import {mapGetters, mapState} from "vuex";
import ListPricesTable from "./ListPricesTable";

export default {
  name: "ListPrices",
  components: {ListPricesTable},

  computed: {
    ...mapGetters('currencies', {
      conversion: 'conversion'
    }),
    ...mapState('settings', {
      from: state => state.from,
      to: state => state.to,
    }),
  }
}
</script>

<style scoped lang="scss">
.list-prices__col {
  width: 50%;
}
</style>