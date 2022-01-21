<template>
  <button
      class="button-theme"
      :class="{'button-theme_dark' : darkTheme}"
      @click="toggleTheme"
      aria-label="Переключить тему"
  ></button>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: "ButtonTheme",
  methods: {
    toggleTheme() {
      this.$store.commit('settings/toggleTheme')
    }
  },

  computed: {
    ...mapState('settings', {
      darkTheme: state => state.darkTheme,
    }),
  }
}
</script>

<style scoped lang="scss">
.button-theme {
  width: 2.5rem;
  height: 2.5rem;
  border-width: 0;
  background: transparent;
  border-radius: .5rem;
  transition: background .5s;
  position: relative;
  overflow: hidden;
  cursor: pointer;

  &::before {
    content: url("../assets/images/icons/moon.svg");
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    line-height: 0;
  }
  &.button-theme_dark::before {
    content: url("../assets/images/icons/sun.svg");
  }

  &:hover {
    background: rgba(255, 255, 255, .125);
  }
}

@keyframes rise {
  from {
    transform: rotateZ(180deg);
  }
  to {
    transform: rotateZ(360deg);
  }
}
@keyframes set {
  from {
    transform: rotateZ(0);
  }
  to {
    transform: rotateZ(180deg);
  }
}
</style>