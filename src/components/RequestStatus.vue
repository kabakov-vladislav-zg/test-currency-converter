<template>
  <div
    class="request-status"
    :class="classObject"
    :style="{ height: height }"
  >
    <div
      v-if="status === 'error'"
      class="request-status__error-message"
    >
      Ошибка!
    </div>
  </div>
</template>

<script>
export default {
  name: "RequestStatus",

  props: {
    status: {
      type: String,
      default: 'unloaded'
    },
    height: {
      type: String,
      required: true
    }
  },

  computed: {
    classObject() {
      let className = 'request-status'

      switch (this.status) {
        case 'onload':
          className += '_onload'
          break;
        case 'error':
          className += '_error'
          break;
        default:
          className = null
      }

      return className
    }
  }
}
</script>

<style scoped lang="scss">
.request-status {
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    border: .5rem solid var(--text-color);
    border-right-color: transparent;
    transform: translate(-50%, -50%);
  }
  &_onload {
    &::before {
      animation: roll linear infinite 1s;
    }
  }
  &_error {
    &::before {
      content: none;
    }
  }
}
.request-status__error-message {

}

@keyframes roll {
  0% {
    transform: translate(-50%, -50%) rotateZ(0);
  }
  100% {
    transform: translate(-50%, -50%) rotateZ(360deg);
  }
}
</style>