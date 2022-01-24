<template>
  <header class="header">
    <MenuSettings />
  </header>
</template>

<script>
import MenuSettings from "./MenuSettings";
export default {
name: "TheHeader",
  components: {MenuSettings}
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
</style>