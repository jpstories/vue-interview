<template>
  <div>
    <b-modal ref="editUserModal" id="user-add-modal" title="Добавление нового сотрудника" hide-footer>
      <b-form @submit.prevent="onSubmit" class="w-100">
          <Alert v-if="showMessage" message="Пользователь добавлен!"></Alert>
          <b-form-group id="form-name-add-group" label="ФИО:" label-for="form-name-add-input">
            <b-form-input id="name" v-model="name" type="text" required></b-form-input>
          </b-form-group>

          <b-form-group id="form-typework-add-group" label="Тип занятости:" label-for="form-typework-add-input">
            <b-form-select 
              v-model="typeWork" 
              :options="[{ text: 'Выберите должность', value: null }, 'Программист-бэкенд', 'Верстальщик', 'Дизайнер']"
              size="sm" 
              class="mt-3"
              required>
            </b-form-select>
          </b-form-group>

          <b-form-group id="form-contract-add-group" label="Трудоустройство:" label-for="form-contract-add-input">
            <b-form-select 
              v-model="contract" 
              :options="[{ text: 'Выберите способ трудоустройства', value: null }, 'Трудовой договор', 'Фриланс']"
              size="sm" 
              class="mt-3"
              required>
            </b-form-select>
          </b-form-group>

          <b-form-group id="form-pay-add-group" label="Зарплата:" label-for="form-pay-add-input">
            <b-form-input id="pay" v-model="pay" type="text" required></b-form-input>
          </b-form-group>

        <b-button type="submit" variant="primary">Добавить</b-button>
      </b-form>
    </b-modal>
    </div>
</template>

<script>
import Alert from '../Alert'
export default {
  name: 'UserAdd',
  components: {
    Alert
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
        id: String(Math.ceil(Math.random(1000, 5000) * 1000)),
        name: this.name,
        typeWork: this.typeWork,
        contract: this.contract,
        pay: [+this.pay, 0,0,0,0,0,0,0,0,0,0,0]
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
      }, 1500)

    },
  },
};
</script>