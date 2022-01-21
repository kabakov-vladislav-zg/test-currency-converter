<template>
  <div class="menu">
    <div>
      <button
        v-for="item in last.from"
        :key="item"
        @click="setCurrentCurrency({position: 'from', item})"
        class="button-ghost menu__button-ghost menu__button-ghost_last"
        :class="{'active' : item === from}"
      >
        {{ item }}
      </button>
      <button
        @click="$emit('setStateSelector', 'from')"
        class="button-ghost menu__button-ghost menu__button-ghost_selector"
        :class="{'active' : stateSelector === 'from'}"
      >
        {{ from }}
      </button>
    </div>

    <button
      @click="swapCurrencies"
      class="button-ghost menu__button-ghost menu__button-ghost_swap"
    ></button>

    <div>
      <button
        @click="$emit('setStateSelector', 'to')"
        class="button-ghost menu__button-ghost menu__button-ghost_selector"
        :class="{'active' : stateSelector === 'to'}"
      >
        {{ to }}
      </button>
      <button
        v-for="item in last.to"
        :key="item"
        @click="setCurrentCurrency({position: 'to', item})"
        class="button-ghost menu__button-ghost menu__button-ghost_last"
        :class="{'active' : item === to}"
      >
        {{ item }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: "ConverterCurrencyMenu",

  props: {
    stateSelector: {
      type: String,
      required: true
    }
  },

  computed: {
    ...mapState('settings', {
      from: state => state.from,
      to: state => state.to,
      last: state => state.last,
    }),
  },
  methods: {
    ...mapActions('settings', [
      'setCurrentCurrency',
      'swap'
    ]),

    swapCurrencies() {
      this.$emit('swapCurrencies')
      this.swap()
    }
  }
}
</script>

<style scoped lang="scss">
.menu {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.menu__button-ghost {
  &_last {
    display: none;
  }
  &_last.active {
    border-bottom: 1px solid var(--text-color);
  }
  &_selector.active {
    transform: rotateZ(180deg);
  }

  &_swap {
    width: 2.5rem;
    height: 2.5rem;

    &::before {
      content: url("../assets/images/icons/arrow_swap.svg");
      line-height: 0;
    }
  }

  @media (min-width: 768px) {
    &_selector {
      font-size: 0;
      width: 2.5rem;
      height: 2.5rem;

      &::before {
        content: url("../assets/images/icons/arrow.svg");
        line-height: 0;
      }
    }

    &_last {
      display: inline-block;
    }
  }
}
</style>