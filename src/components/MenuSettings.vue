<template>
  <div class="menu-settings">
    <ModalContainer
      v-if="menu"
      @close="menu = false"
      class="menu-settings__modal"
    >
      <MenuSettingsMenu />
    </ModalContainer>
    <button
      @click="toggleMenu"
      class="button-ghost menu-settings__toggle"
      :class="{'active' : menu}"
    ></button>
  </div>
</template>

<script>
import ModalContainer from "./ModalContainer";
import MenuSettingsMenu from "./MenuSettingsMenu";
export default {
name: "MenuSettings",
  components: {MenuSettingsMenu, ModalContainer},

  data() {
    return {
      menu: false
    }
  },

  methods: {
    toggleMenu() {
      this.menu = !this.menu
    }
  }
}
</script>

<style scoped lang="scss">
.menu-settings {
  position: relative;
  width: 2.5rem;
  height: 2.5rem;
}
.menu-settings__toggle {
  width: 2.5rem;
  height: 2.5rem;
  &::before {
    content: url("../assets/images/icons/burger.svg");
    line-height: 0;
  }

  &.active {
    @media (min-width: 768px) {
      position: absolute;
    }
  }
}
.menu-settings__modal {
  @media (min-width: 768px) {
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>