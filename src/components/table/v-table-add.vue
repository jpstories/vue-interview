<template>
  <div class="v-table__add">
    <form @submit.prevent="onSubmit">
      <div class="v-table__add-col">
        <label for="fname">Ф.И.О</label>
        <input id="fname" name="fname" v-model="name" type="text" required />

        <label for="typeWork">Тип занятости</label>
        <select name="typeWork" id="typeWork" v-model="typeWork" required>
          <option value="Программист-бэкенд">Программист-бэкенд</option>
          <option value="Верстальщик">Верстальщик</option>
          <option value="Дизайнер">Дизайнер</option>
        </select>
      </div>

      <div class="v-table__add-col">
        <label for="contract">Трудоустройство</label>
        <select name="contract" id="contract" v-model="contract" required>
          <option value="Трудовой договор">Трудовой договор</option>
          <option value="Фриланс">Фриланс</option>
        </select>

        <label for="profit">Зарплата</label>
        <input id="profit" name="profit" v-model="pay" type="text" required />
      </div>

      <button type="submit" class="v-table__add-btn">Добавить</button>
    </form>
    <alert class="alert__added" v-if="showMessage" message="Пользователь добавлен!"></alert>
  </div>
</template>

<script>
import Alert from '../Alert/Alert'
export default {
  name: 'v-table-add',
  components: {
    alert: Alert
  },
  data: () => ({
    id: null,
    name: null,
    typeWork: null,
    contract: null,
    pay: null,
    showMessage: false,
  }),

  methods: {
    onSubmit() {
      const userAdded = {
        id: Math.ceil(Math.random(1, 4000)),
        name: this.name,
        typeWork: this.typeWork,
        contract: this.contract,
        pay: +this.pay,
      };

      this.$emit("review-submitted", userAdded);
      this.id = null;
      this.name = null;
      this.typeWork = null;
      this.contract = null;
      this.pay = null;
      this.showMessage = true;

      setTimeout(() => {
        this.showMessage = false;
      }, 2000)
    },
  },
};
</script>

<style scoped>
.v-table__add-col {
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  margin-left: 15px;
}

input,
select {
  width: 330px;
  height: 25px;
}

select {
  height: 31px;
}

.v-table__add-btn {
  background: linear-gradient(45deg, rgb(235, 119, 42), rgb(253, 156, 9));
  color: rgb(248, 248, 248);
  text-align: center;
  line-height: 1.5;
  height: 35px;
  border: none;
  box-shadow: none;
  border-radius: 5px;
  margin-left: 30px;
  margin-top: 6px;
  flex-basis: 15%;
  cursor: pointer;
  transition: 0.2s;
  font-weight: 700;
}

.v-table__add-btn:hover {
  flex-basis: 16%;
  color: rgb(218, 218, 218);
}

.v-table__add {
  width: 95%;
  height: max-content;
  background: rgb(230, 19, 82);
  color: rgb(238, 238, 238);
  padding: 15px;
  box-sizing: border-box;
  display: flex;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  margin: 0 auto;
  box-shadow: 0 2px 3px rgb(58, 58, 58);
}

.v-table__add form {
  display: flex;
  flex-flow: row;
  align-items: center;
}

.v-table__input-typeWork {
  margin-left: 22px;
}
.alert__added {
  position: fixed;
  top: 40px;
  left: 5%;
  width: 90%;
}
</style>