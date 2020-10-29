<template>
  <div id="app">
    <v-table :users_data="users" />
    
  </div>
</template>

<script>
// import { mapActions, mapGetters } from "vuex";
import vTable from "./components/table/v-table";
import users from "./data/users";

export default {
  name: "App",
  components: {
    vTable,
  },
  data: () => {
    return {
      users: users
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
  margin-top: 60px;
}
</style>
