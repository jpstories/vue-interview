<template>
  <div>
    <transition name="slide-fade">
      <b-alert id="alert__view" variant="success" show>{{ message }}</b-alert>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true
    }
  },
};
</script>

<style scope>
#alert__view {
  position: fixed;
  top: 40px;
  left: 5%;
  width: 90%;
  z-index: 9999;
}

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  opacity: 0;
}
</style>