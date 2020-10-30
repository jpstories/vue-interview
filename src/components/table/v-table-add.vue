<template>
  <div>
    <b-modal ref="editUserModal" id="user-add-modal" title="Добавление нового сотрудника" hide-footer>
      <b-form @submit.prevent="onSubmit" class="w-100">
          <alert v-if="showMessage" message="Пользователь добавлен!"></alert>
          <b-form-group id="form-name-edit-group" label="ФИО:" label-for="form-name-edit-input">
            <b-form-input id="name" v-model="name" type="text" required></b-form-input>
          </b-form-group>

          <b-form-group id="form-typework-edit-group" label="Тип занятости:" label-for="form-typework-edit-input">
            <b-form-select 
              v-model="typeWork" 
              :options="[{ text: 'Выберите должность', value: null }, 'Программист-бэкенд', 'Верстальщик', 'Дизайнер']"
              size="sm" 
              class="mt-3">
            </b-form-select>
          </b-form-group>

          <b-form-group id="form-contract-edit-group" label="Трудоустройство:" label-for="form-contract-edit-input">
            <b-form-select 
              v-model="contract" 
              :options="[{ text: 'Выберите способ трудоустройства', value: null }, 'Трудовой договор', 'Фриланс']"
              size="sm" 
              class="mt-3">
            </b-form-select>
          </b-form-group>

          <b-form-group id="form-pay-edit-group" label="Зарплата:" label-for="form-pay-edit-input">
            <b-form-input id="pay" v-model="pay" type="text" required></b-form-input>
          </b-form-group>

        <b-button type="submit" variant="primary">Добавить</b-button>
      </b-form>
    </b-modal>
    <!-- <b-button v-b-modal.user-update-modal type="submit" variant="primary">Добавить</b-button> -->
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
      const userAddObj = {
        id: Math.ceil(Math.random(1000, 5000) * 1000),
        name: this.name,
        typeWork: this.typeWork,
        contract: this.contract,
        pay: +this.pay,
      };

      this.$emit("addHandlerUser", userAddObj);

      // Очищаем обьект
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