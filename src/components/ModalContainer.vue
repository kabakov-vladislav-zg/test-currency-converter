<template>
  <div class="modal-container">
    <button
      class="button-ghost modal-container__close"
      @click="$emit('close')"
    ></button>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "ModalContainer",

  mounted() {
    this.$store.commit('toggleModal', true)
  },
  unmounted() {
    this.$store.commit('toggleModal', false)
  }
}
</script>

<style scoped lang="scss">
.modal-container {
  @media (max-width: 767.9999px) {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(255, 255, 255, .875);

    overflow-y: auto;

    padding: 1rem 1rem;

    display: flex;
    flex-direction: column;
  }
}
.modal-container__close {
  display: none;
  @media (max-width: 767.9999px) {
    display: block;

    width: 2.5rem;
    height: 2.5rem;
    flex-shrink: 0;

    align-self: flex-end;

    &::before {
      content: url("../assets/images/icons/close.svg");
      line-height: 0;
    }
  }
}
</style>