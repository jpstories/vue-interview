<template>
  <div class="payment">
    <div class="payment__info">
      <div class="payment__user-head">
        <router-link to="/">
          <b-button variant="outline-primary" href="/">&larr; Назад</b-button>
        </router-link>

        <b-jumbotron class="payment__user-head__card" bg-variant="light" text-variant="dark">
          <h2>{{ user.name }}</h2>
          <p>{{ user.typeWork }}</p>
          <p>{{ user.contract }}</p>
        </b-jumbotron>

        <div>
          <img src="../../assets/vallet.png" alt="" width="128" />
          <h4>Доходы сотрудника</h4>
          <p><b>(в рублях)</b></p>
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
          <div class="payment__year-month">Январь</div>
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
            @click="onDeleteUserPay(user.id)"
            type="button"
            class="btn btn-danger btn-sm"
          >
            Удалить
          </button>
        </div>
      </div>

      <b-modal
        size="xl"
        ref="editUserModal"
        id="user-payments-update-modal"
        title="Редактирование информации о доходах сотрудника"
        hide-footer
        header-bg-variant="primary"
        header-text-variant="light"
        :no-close-on-backdrop="true"
      >
        <b-form class="w-100">
          <div class="payment__table">
            <div class="payment__year payment__year-head">
              <div class="payment__year-month">Январь</div>
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
                id="form-payment-edit-input"
                type="text"
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

    <div class="payment__checkout">
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

        <b-button @click="closeCheckout" href="#" variant="primary"
          >Создать отчет</b-button
        >

        <b-button
          @click="openConverter"
          v-if="checkoutShow"
          type="button"
          variant="info"
          >Конвертировать</b-button
        >

        <div class="converter" v-if="converterShow">
          <img
            src="../../assets/exchange.png"
            alt=""
            width="300"
          />
          <b-button @click="convertEuro" variant="primary"
            >&euro; Евро</b-button
          >
          <b-button @click="convertDollar" variant="primary"
            >$ Доллары</b-button
          >

          <div class="converterTotal">
            <div v-if="dollarhandle">
              В долларах: {{ Math.ceil(sumAfterDollar) }} $
            </div>
            <div v-if="eurohandle">
              В евро: {{ Math.ceil(sumAfterEuro) }} &euro;
            </div>
          </div>
        </div>
      </b-jumbotron>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import vallets from "../../data/vallets.js";

export default {
  name: "userPayInfo",
  data() {
    return {
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
  props: {},
  methods: {
    onCheckoutPayments(arr) {
      if(this.user.contract === "Фриланс") {
        this.ndfl = 6
      } else {
        this.ndfl = 13
      }
      let reducer = (acc, cur) => +acc + +cur;
      this.sumBeforeTax = arr.reduce(reducer);
      return (
        this.sumAfterTax = Math.ceil(this.sumBeforeTax - (this.sumBeforeTax * this.ndfl) / 100, 2),
        this.checkoutShow = true
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

    onDeleteUserPay(id) {
      if (confirm("Вы действительно хотите удалить информацию о доходе?")) {
        axios
          .put(`http://localhost:3000/users/${id}`)
          .then(() => {
            this.user.pay = new Array(12).fill(0)
            this.getUsers();
          })
          .catch((error) => {
            console.error(error);
            this.getUsers();
          });
        // this.user.pay.g2020 = new Array(12).fill(0)
      }
    },

    getUsers() {
      const path = "http://localhost:3000/users";
      axios
        .get(path)
        .then((res) => {
          this.users = res.data;
          this.user = this.users.find(item => item.id === this.$route.params.userID);
          console.log(this.user.pay)
        })
        .catch((error) => {
          console.error(error);
        });
    },

    // updateUserPay(payload, userID) {
    //   const path = `http://localhost:3000/users/${userID}`;
    //   axios
    //     .put(path, payload)
    //     .then(() => {
    //       this.getUsers();
    //       this.sortByCategories();
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //       this.getUsers();
    //       this.sortByCategories();
    //     });
    // },

    onEditPaymentUser(payArray) {
      this.editPayForm.initPay = payArray;
    },

    // onSubmitUpdate(e) {
    //   e.preventDefault();
    //   this.$refs.editUserModal.hide();
    //   const payload = {
    //     pay: this.editPayForm.pay
    //   };
    //   this.updateUserPay(payload, this.user.id);
    // },
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
</style>