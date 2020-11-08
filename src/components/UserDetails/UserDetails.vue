<template>
  <div class="payment">
    <loading transition="fade" :active.sync="isLoading" 
        :is-full-page="fullPage">
    </loading>

    <div class="payment__info" v-if="!isLoading">
      <div class="payment__user-head">
        <router-link to="/">
          <b-button variant="outline-primary" href="/">&larr; Назад</b-button>
        </router-link>

        <div class="payment__user-head__logo">
          <img src="../../assets/vallet.png" alt="" width="128" />
          <h4>Доходы сотрудника</h4>
          <p><b>Валюта: <span>₽</span></b></p>
        </div>

        <div class="payment__user-head__card" bg-variant="light" text-variant="dark">
          <h2>{{ user.name }}</h2>
          <p><b>Занятость:</b> {{ user.typeWork }} (налог <i> {{this.ndfl}} %</i>)</p>
          <p><b>Договор:</b> {{ user.contract }}</p>
        </div>

        <div class="payment__choose-year">
          <span>Год:</span>
          <b-form-select
            v-model="selected"
            :options="options"
            size="sm"
            class="mt-3"
          >
          </b-form-select>
        </div>
      </div>

      <div class="payment__table">
        <div class="payment__year payment__year-head">
          <div class="payment__year-month current__month">Январь</div>
          <div class="payment__year-month">Февраль</div>
          <div class="payment__year-month">Март</div>
          <div class="payment__year-month">Апрель</div>
          <div class="payment__year-month">Май</div>
          <div class="payment__year-month">Июнь</div>
          <div class="payment__year-month">Июль</div>
          <div class="payment__year-month">Август</div>
          <div class="payment__year-month">Сентябрь</div>
          <div class="payment__year-month">Октябрь</div>
          <div class="payment__year-month">Ноябрь</div>
          <div class="payment__year-month">Декабрь</div>
          <div class="payment__year-month payment__year-actions"></div>
        </div>

        <div class="payment__year payment__year-body">
          <div
            class="payment__year-month"
            v-for="(price, index) in user.pay"
            :key="index"
          >
            {{ price }}
          </div>

          <button 
            type="button" 
            class="btn btn-warning btn-sm"
            v-b-modal.user-payments-update-modal
            @click="onEditPaymentUser(user.pay)"
            >
            Редактировать
          </button>

          <button
            @click="onDeletePaymentUser(user.pay)"
            type="button"
            class="btn btn-danger btn-sm"
          >
            Удалить
          </button>
        </div>
      </div>

      <b-modal
        v-if="editOn"
        size="xl"
        ref="editPayUserModal"
        id="user-payments-update-modal"
        title="Редактирование информации о доходах сотрудника"
        hide-footer
        header-bg-variant="primary"
        header-text-variant="light"
        :no-close-on-backdrop="true"
      >
        <b-form class="w-100" @submit="onSubmitUpdatePay" @reset="onResetUpdatePay">
          <div class="payment__table">
            <div class="payment__year payment__year-head">
              <div class="payment__year-month current__month">Январь</div>
              <div class="payment__year-month">Февраль</div>
              <div class="payment__year-month">Март</div>
              <div class="payment__year-month">Апрель</div>
              <div class="payment__year-month">Май</div>
              <div class="payment__year-month">Июнь</div>
              <div class="payment__year-month">Июль</div>
              <div class="payment__year-month">Август</div>
              <div class="payment__year-month">Сентябрь</div>
              <div class="payment__year-month">Октябрь</div>
              <div class="payment__year-month">Ноябрь</div>
              <div class="payment__year-month">Декабрь</div>
              <div class="payment__year-month payment__year-actions"></div>
            </div>

            <div class="payment__year payment__year-body">
              <b-form-input
                v-for="(payment, index) in user.pay"
                :key="index"
                type="number"
                v-model="editPayForm.initPay[index]"
                required
              />

              <b-button type="submit" variant="primary">Обновить</b-button>
              <b-button type="reset" variant="danger">Отмена</b-button>
            </div>
          </div>
        </b-form>
      </b-modal>
    </div>

    <div class="payment__checkout" v-if="!isLoading">
      <b-button
        @click="onCheckoutPayments(user.pay)"
        type="button"
        variant="primary"
        >Расчитать (на руки)
      </b-button>

      <b-jumbotron v-if="checkoutShow" class="checkout" bg-variant="light">
        <h1>Расчет</h1>
        <p>
          Сумма всех начислений за 2020 год:
          <b>{{ sumAfterTax }} ₽ (после вычета налога {{this.ndfl}} %)</b>
        </p>

        <b-button size="sm" @click="closeCheckout" href="#" variant="primary"
          >Создать отчет</b-button
        >

        <b-button
          size="sm"
          @click="openConverter"
          v-if="checkoutShow"
          type="button"
          variant="info"
          v-b-modal.converter-modal
          >Конвертировать</b-button
        >
      </b-jumbotron>

      <b-modal
        id="converter-modal"
        title="Конвертер"
        header-bg-variant="primary"
        header-text-variant="light"
        :no-close-on-backdrop="true"
        hide-footer
      >
        <div class="converter" v-if="converterShow">
            <div class="converter__title">
              <span>Перевести начисления в размере:</span>
              <span class="converter__title-price" ><b>{{ sumAfterTax }} ₽</b></span>
            </div>

            <img
              src="../../assets/exchange.png"
              alt=""
              width="300"
            />

            <div class="converter__actions">
              <b-button @click="convertEuro" variant="primary">&euro; Евро</b-button>
              <b-button @click="convertDollar" variant="primary">$ Доллары</b-button>
            </div>

            <div class="converter__total">
              <div v-if="dollarhandle">
                В долларах: <b>{{ Math.ceil(sumAfterDollar) }} $</b>
              </div>
              <div v-if="eurohandle">
                В евро: <b>{{ Math.ceil(sumAfterEuro) }} &euro;</b>
              </div>
            </div>
        </div>
      </b-modal>

    </div>
  </div>
</template>

<script>
import axios from "axios";
import vallets from "../../data/vallets.js";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  name: "userPayInfo",
  data() {
    return {
      isLoading: false,
      fullPage: true,
      users: [],
      user: {},
      currencyYear: new Date().getFullYear(),
      selected: null,
      options: [
        { text: `Текущий: ${new Date().getFullYear()}`, value: null },
        { text: "2019", value: 1 },
        { text: "2018", value: 2 },
      ],
      editPayForm: {
        initPay: [0,0,0,0,0,0,0,0,0,0,0,0]
      },
      editOn: false,
      //handles
      checkoutShow: false,
      converterShow: false,
      dollarhandle: false,
      eurohandle: false,
      //numbers
      ndfl: Number,
      sumBeforeTax: Number,
      sumAfterTax: Number,
      sumAfterEuro: Number,
      sumAfterDollar: Number,
    };
  },
  components: {
    Loading
  },
  props: {},
  methods: {
    onCheckoutPayments(arr) {
      this.isLoading = true;
      if(this.user.contract === "Фриланс") {
        this.ndfl = 6
      } else {
        this.ndfl = 13
      }
      let reducer = (acc, cur) => +acc + +cur;
      this.sumBeforeTax = arr.reduce(reducer);
      return (
        this.sumAfterTax = Math.ceil(this.sumBeforeTax - (this.sumBeforeTax * this.ndfl) / 100, 2),
        this.checkoutShow = true,
        setTimeout(() => {this.isLoading = false}, 100)
      );
    },
    closeCheckout() {
      this.checkoutShow = false;
    },
    convertDollar() {
      this.sumAfterDollar = this.sumAfterTax / vallets.dollar;
      this.dollarhandle = true;
    },
    convertEuro() {
      this.sumAfterEuro = this.sumAfterTax / vallets.euro;
      this.eurohandle = true;
    },
    openConverter() {
      this.converterShow = true;
    },

    deletePaymentUser(payload) {
      if (confirm("Вы действительно хотите удалить информацию о доходе сотрудника?")) {
        const path = `http://localhost:3000/users/${this.user.id}`;
        axios
          .put(path, payload)
          .then(() => {
            this.getUsers();
          })
          .catch((error) => {
            console.error(error);
            this.getUsers();
          });
      }
    },
    onDeletePaymentUser() {
      const payload = {
        name: this.user.name,
        typeWork: this.user.typeWork,
        contract: this.user.contract,
        pay: this.editPayForm.initPay
      };
      this.deletePaymentUser(payload);
    },

    getUsers() {
      this.isLoading = true;
      const path = "http://localhost:3000/users";
      axios
        .get(path)
        .then((res) => {
          this.users = res.data;
          this.user = this.users.find(item => item.id === this.$route.params.userID);
          setTimeout(() => {
            this.isLoading = false;
          }, 50)
          this.setupNdfl();
        })
        .catch((error) => {
          console.error(error);
        });
    },

    updateUserPay(payload) {
      const path = `http://localhost:3000/users/${this.user.id}`;
      axios
        .put(path, payload)
        .then(() => {
          this.getUsers();
        })
        .catch((error) => {
          console.error(error);
          this.getUsers();
        });
    },

    onEditPaymentUser(currencyPaymentArr) {
      this.editOn = true;
      this.editPayForm.initPay = currencyPaymentArr;
    },

    clearValletCheckout() {
      this.sumAfterEuro = null;
      this.sumAfterDollar = null;
      this.dollarhandle = false;
      this.eurohandle = false;
    },

    onSubmitUpdatePay(e) {
      e.preventDefault();
      this.$refs.editPayUserModal.hide();
      const payload = {
        name: this.user.name,
        typeWork: this.user.typeWork,
        contract: this.user.contract,
        pay: this.editPayForm.initPay
      };
      this.updateUserPay(payload);
      this.editOn = false;
      this.clearValletCheckout();
      this.checkoutShow = false;
    },

    onResetUpdatePay(e) {
      e.preventDefault();
      this.$refs.editPayUserModal.hide();
    },

    setupNdfl() {
      if(this.user.contract === "Фриланс") {
        this.ndfl = 6
      } else {
        this.ndfl = 13
      }
    }

  },
  mounted() {
    this.getUsers();
    console.log('Mounted detail');
  }
};
</script>

<style scoped>
@import "./UserDetails.css";
.edit-payment-inputs {
  width: 100%;
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: space-between;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>