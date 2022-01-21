<template>
  <header class="header">
    <ButtonTheme class="header__item" />
  </header>
</template>

<script>
import ButtonTheme from "./ButtonTheme";
export default {
name: "TheHeader",
  components: {ButtonTheme}
}
</script>

<style scoped lang="scss">
.header {
  height: 4rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-bottom: 1px solid var(--text-color);
}
.header__item + .header__item {
  margin-left: 1rem;
}
</style>