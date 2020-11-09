<template>
  <div>
    <b-alert id="alert__view" variant="success" show>{{ message }}</b-alert>
  </div>
</template>

<script>
export default {
  name: "AlertBlock",
  props: {
    message: {
      type: String,
      required: true,
    },
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
</style>
