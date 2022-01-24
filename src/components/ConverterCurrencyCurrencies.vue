<template>
  <div class="currencies">
    <template v-if="currencies.status === 'success'">
      <label>Поиск<input type="text" v-model="search"></label>
      <div class="currencies__table">
        <template v-for="(currency, name) in currencies.data">
          <button
            v-if="isDesired(currency, name)"
            :key="currency"
            @click="setCurrency(name)"
            class="button-ghost currencies__button-ghost"
            :class="{
              'active': name === this[stateSelector],
              'last': this.last[stateSelector].includes(name),
            }"
            v-html="getButtonTitle(currency, name)"
          ></button>
        </template>
      </div>
    </template>
    <RequestStatus
      v-else
      :height="'20rem'"
      :status="currencies.status"
    />
  </div>
</template>

<script>
import {mapGetters, mapState} from 'vuex'
import RequestStatus from "./RequestStatus";

export default {
  name: "ConverterCurrencyCurrencies",
  components: {RequestStatus},
  props: {
    stateSelector: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      search: ''
    }
  },

  methods: {
    isDesired(currency, name) {
      if(!this.search) {
        return true
      }
      const regexp = new RegExp(this.search, 'i')
      return !!currency.match(regexp) || !!name.match(regexp)
    },
    getButtonTitle(currency, name) {
      let str = `${name} - ${currency}`
      if(!this.search) {
        return str
      }
      const regexp = new RegExp(this.search, 'i')
      let result = str.match(regexp)
      return str.replace(regexp, `<span class="currencies__match">${result}</span>`)
    },
    setCurrency(name) {
      this.$emit('setStateSelector', '')
      this.$store.dispatch('settings/setCurrentCurrency', {
        position: this.stateSelector,
        item: name
      })
    }
  },

  mounted() {
    this.$store.dispatch('currencies/initData', 'currencies')
  },

  computed: {
    ...mapState('settings', {
      from: state => state.from,
      to: state => state.to,
      last: state => state.last,
    }),
    ...mapState('currencies', {
      currencies: state => state.currencies
    })
  }
}
</script>

<style scoped lang="scss">
.currencies__table {
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
::v-deep .currencies__match {
  font-weight: bold;
  background-color: yellow;
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