<template>
  <div class="list-prices row">
    <template v-if="conversions.status === 'success'">
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
    <RequestStatus
      v-else
      :height="'15.875rem'"
      :status="conversions.status"
    />
  </div>
</template>

<script>
import {mapGetters, mapState} from "vuex";
import ListPricesTable from "./ListPricesTable";
import RequestStatus from "./RequestStatus";

export default {
  name: "ListPrices",
  components: {RequestStatus, ListPricesTable},

  computed: {
    ...mapGetters('currencies', {
      conversion: 'conversion'
    }),
    ...mapState('settings', {
      from: state => state.from,
      to: state => state.to,
    }),
    ...mapState('currencies', {
      conversions: state => state.conversions
    })
  }
}
</script>

<style scoped lang="scss">
.list-prices__col {
  width: 50%;
}
</style>