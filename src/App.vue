<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
// import { mapActions, mapGetters } from "vuex";

export default {
  name: "App",
  data: () => {
    return {

    };
  },
  // computed: {
  //   ...mapGetters(["USERS"]),
  // },
  // methods: {
  //   ...mapActions(["GET_USERS_FROM_API"]),
  // },
  // mounted() {
  //   this.GET_USERS_FROM_API();
  // },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
