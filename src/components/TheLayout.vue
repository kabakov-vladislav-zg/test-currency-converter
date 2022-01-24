<template>
  <div
      class="layout layout__theme layout__background"
      :class="{
        'layout__theme_dark' : darkTheme,
        'layout_modal' : modal,
      }"
  >
    <div class="layout__container">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: "TheLayout",

  computed: {
    ...mapState('settings', {
      darkTheme: state => state.darkTheme,
    }),
    modal() {
      return this.$store.state.modal
    }
  }
}
</script>

<style scoped lang="scss">
.layout_modal {
  @media (max-width: 767.9999px) {
    overflow: hidden;
    height: 100vh;
  }
}
.layout__theme {
  --text-color: #{$color-dark};
  --layout-background-position: 0 0;

  &.layout__theme_dark {
    --text-color: #{$color-light};
    --layout-background-position: 100% 100%;
  }
}
.layout__background {
  background-image: linear-gradient(to left top, rgb(2, 13, 4), rgb(99, 129, 62), rgb(237, 242, 208));
  background-size: 300% 300%;
  background-attachment: fixed;
  background-position: var(--layout-background-position);
  transition-property: background-position;
  transition-duration: $transition-theme;
}
.layout__container {
  min-height: 100vh;
  margin-left: auto;
  margin-right: auto;
  padding: 0 5%;
  max-width: 1440px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (min-width: 1440px) {
    padding: 0 72px;
  }
}
</style>