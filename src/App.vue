<template>
  <TheLayout>
    <TheHeader />
    <main class="maim">
      <router-view/>
    </main>
    <TheFooter />
  </TheLayout>
</template>

<script>
import TheHeader from "./components/TheHeader";
import TheLayout from "./components/TheLayout";
import TheFooter from "./components/TheFooter";
export default {
  components: {TheFooter, TheLayout, TheHeader}
}
</script>

<style scoped lang="scss">
.maim {
  flex-grow: 1;
}
</style>