<template>
  <div class="v-table-row">
    <div class="row row__name">{{ userObj.name }}</div>
    <div class="row row__earned">{{ userObj.typeWork }}</div>
    <div class="row row__spent">{{ userObj.contract }}</div>

    <div class="row row__pay">
      <mark><a href="#">{{ userObj.pay }} руб.</a></mark>
      <img class="row__pay-img" src="../../assets/calendar.png"/>
    </div>

    <div class="row row__actions">
      <button>Редактировать</button>
      <button @click="removeWorker(index)">Удалить</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "v-table-row",
  props: {
    userObj: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },

  data() {
    return {
      index: Number,
    };
  },

  methods: {
    removeWorker(index) {
      if (confirm("Вы действительно хотите удалить сотрудника?")) {
        this.$emit("onRemoveWorker", index);
      }
    },
  },
};
</script>

<style scoped>
.v-table-row {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 1px 0;
  border: 1px solid #ececec;
  border-radius: 10px;
}
.row {
  flex-basis: 25%;
  padding: 16px 20px;
  text-align: left;
}
.row__name {
  min-width: 200px;
}
.row__pay-img {
  cursor: pointer;
}
.row__pay a {
  font-weight: bold;
}
.row__actions {
  display: flex;
  flex-flow: row;
  align-items:center;
}
</style>