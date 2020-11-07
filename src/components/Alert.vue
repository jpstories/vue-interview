<template>
  <div>
    <b-alert id="alert__view" variant="success" show>{{ message }}</b-alert>
    <br />
  </div>
</template>

<script>
export default {
  props: {
    message: String,
  },
};
</script>

<style>
#alert__view {
  position: fixed;
  top: 40px;
  left: 5%;
  width: 90%;
  z-index: 9999;
}
</style>