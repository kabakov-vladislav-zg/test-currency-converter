<template>
  <div class="converter-currency row">
    <template v-if="conversions.status === 'success'">
      <div class="row__col converter-currency__menu">
        <ConverterCurrencyMenu
          :stateSelector="stateSelector"
          @setStateSelector="toggleSelector"
          @swapCurrencies="swapCurrencies"
        />
      </div>
      <div
        class="row__col converter-currency__menu"
        v-if="stateSelector"
      >
        <ModalContainer @close="toggleSelector('')">
          <ConverterCurrencyCurrencies
            @setStateSelector="toggleSelector"
            :stateSelector="stateSelector"
          />
        </ModalContainer>
      </div>
      <template v-else>
        <div class="row__col converter-currency__input">
          <input type="number" v-model="initialValue">
        </div>
        <div class="row__col converter-currency__input">
          <input type="number" :value="resultValue" disabled>
        </div>
        <div class="row__col">
          1{{from}} = {{conversion + to}}
        </div>
      </template>
    </template>
    <RequestStatus
      v-else
      :height="'11rem'"
      :status="conversions.status"
    />
  </div>
</template>

<script>
import {mapGetters, mapState} from 'vuex'
import ConverterCurrencyMenu from "./ConverterCurrencyMenu";
import ConverterCurrencyCurrencies from "./ConverterCurrencyCurrencies";
import ModalContainer from "./ModalContainer";
import RequestStatus from "./RequestStatus";
export default {
  name: "ConverterCurrency",
  components: {
    RequestStatus,
    ModalContainer,
    ConverterCurrencyCurrencies,
    ConverterCurrencyMenu
  },

  data() {
    return {
      stateSelector: '',
      initialValue: 1
    }
  },

  mounted() {
    this.$store.dispatch('currencies/initData', 'conversions')
  },

  methods: {
    toggleSelector(state) {
      if(this.stateSelector === state) {
        this.stateSelector = ''
      } else {
        this.stateSelector = state
      }
    },
    swapCurrencies() {
      this.initialValue = this.resultValue
    }
  },

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
    }),
    resultValue() {
      const value = this.conversion * this.initialValue
      return +value.toFixed(2)
    }
  }
}
</script>

<style scoped lang="scss">
.converter-currency {

}
.converter-currency__menu {
  width: 100%;
}
.converter-currency__input {
  width: 100%;

  @media (min-width: 768px) {
    width: 50%;
  }
}
</style>