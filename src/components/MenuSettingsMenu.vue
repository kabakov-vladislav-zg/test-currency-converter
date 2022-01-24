<template>
  <div class="menu">
    <ul class="menu__list">
      <li class="menu__li">
        <label><input type="checkbox" v-model="istPrices">Список стоимостей</label>
      </li>
      <li class="menu__li">
        <label class="menu__li"><input type="checkbox" v-model="chartConversionActive">История курса</label>
        <ul
          v-if="chartConversionActive"
          class="menu__list"
        >
          <li class="menu__li">
            <label><input name="chartConversionView" type="radio" v-model="chartConversionView" value="chart">График</label>
          </li>
          <li class="menu__li">
            <label><input name="chartConversionView" type="radio" v-model="chartConversionView" value="table">Таблица</label>
          </li>
        </ul>
      </li>
      <li class="menu__li">
        <label><input type="checkbox" v-model="darkTheme">Тёмная тема</label>
      </li>
      <li class="menu__li">
        <ButtonTest />
      </li>
    </ul>
  </div>
</template>

<script>
import ButtonTest from "./ButtonTest";
export default {
  name: "MenuSettingsMenu",
  components: {ButtonTest},
  computed: {
    darkTheme: {
      get () {
        return this.$store.state.settings.darkTheme
      },
      set (value) {
        this.$store.commit('settings/toggleTheme', value)
      }
    },
    chartConversionActive: {
      get () {
        return this.$store.state.settings.chartConversion.active
      },
      set (value) {
        this.$store.commit('settings/toggleChartConversion', value)
      }
    },
    chartConversionView: {
      get () {
        return this.$store.state.settings.chartConversion.view
      },
      set (value) {
        this.$store.commit('settings/toggleChartConversionView', value)
      }
    },
    istPrices: {
      get () {
        return this.$store.state.settings.listPrices
      },
      set (value) {
        this.$store.commit('settings/toggleListPrices', value)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.menu {
  padding: 1rem;
  width: 15rem;
  max-width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  @media (min-width: 768px) {
    padding: 2.5rem 1rem;
    position: static;
    transform: none;
    border-radius: 1rem;
    border: 1px solid rgba(255, 255, 255, .125);
    background: rgba(255, 255, 255, .5);
  }
}
.menu__list {
  list-style: none;
  padding-left: 1rem;
}
.menu__li {
  margin-bottom: 1rem;
  display: block;
}
</style>