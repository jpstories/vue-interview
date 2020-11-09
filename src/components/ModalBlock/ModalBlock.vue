<template>
  <transition name="fade">
    <div>
      <div class="overlay"></div>
      <div v-bind:class="[isLarged ? 'cmodal-lg' : '', 'cmodal']">
        <div class="cmodal__header">
          <div class="cmodal__header-title">{{ popupTitle }}</div>
          <i @click="closeModal" class="material-icons">close</i>
        </div>
        <div
          v-bind:class="[
            isLarged ? 'cmodal-lg-content' : '',
            'cmodal__content',
          ]"
        >
          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "ModalBlock",
  props: {
    popupTitle: {
      type: String,
      default: "Окно",
    },
    isLarged: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
    isLarge() {
      this.$emit("isLarged");
    },
  },
};
</script>

<style lang="scss">
.cmodal {
  z-index: 1000;
  min-width: 600px;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: space-between;
  font-size: 1.1em;
  position: fixed;
  top: 50px;
  left: calc(50% - 300px);
  background: white;
  &__header,
  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100px;
    background: rgb(34, 123, 255);
    color: white;
    padding: 0 24px;
  }
  &__footer {
    justify-content: flex-end;
    background: rgb(240, 240, 240);
  }
  &__header i {
    cursor: pointer;
  }
  &__content {
    display: flex;
    flex-flow: column;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    background: white;
    padding: 16px;
    min-height: 500px;
    width: 100%;
    input,
    select {
      min-height: 50px !important;
    }
  }
}

.cmodal-lg {
  left: calc(50% - 600px) !important;
}

.cmodal-lg-content {
  min-height: 100px !important;
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 20;
  background: rgba(48, 48, 48, 0.712);
}
</style>
