<template>
  <div class="currencies">
    <button
      v-for="(currency, name) in currencies"
      :key="currency"
      @click="setCurrency(name)"
      class="button-ghost currencies__button-ghost"
      :class="{
        'active': name === this[stateSelector],
        'last': this.last[stateSelector].includes(name),
      }"
    >
      {{name}} - {{currency}}
    </button>
  </div>
</template>

<script>
import {mapGetters, mapState} from 'vuex'

export default {
  name: "ConverterCurrencyCurrencies",
  components: {},
  props: {
    stateSelector: {
      type: String,
      required: true
    }
  },

  mounted() {
    this.$store.dispatch('currencies/initData', 'currencies')
  },

  computed: {
    ...mapGetters('currencies', {
      currencies: 'currencies'
    }),
    ...mapState('settings', {
      from: state => state.from,
      to: state => state.to,
      last: state => state.last,
    })
  },
  methods: {
    setCurrency(name) {
      this.$emit('setStateSelector', '')
      this.$store.dispatch('settings/setCurrentCurrency', {
        position: this.stateSelector,
        item: name
      })
    }
  }
}
</script>

<style scoped lang="scss">
.currencies {
  display: flex;
  flex-direction: column;

  @media (min-width: 576px) {
    display: block;
    column-count: 2;
    grid-column-gap: 1rem;
    column-fill: balance;
  }

  @media (min-width: 768px) {
    column-count: 3;
  }

  @media (min-width: 992px) {
    column-count: 4;
  }

  @media (min-width: 1200px) {
    column-count: 5;
  }
}
.currencies__button-ghost {
  text-align: left;
  margin-bottom: 1rem;
  padding-left: 2rem;

  position: relative;
  display: block;

  &::before {
    position: absolute;
    top: 50%;
    left: .25rem;
    transform: translateY(-50%);
  }
  &.last::before {
    content: url("../assets/images/icons/last.svg");
  }
  &.active::before {
    content: url("../assets/images/icons/check-mark.svg");
  }
}
</style>