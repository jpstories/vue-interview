<template>
  <div class="payment">
    <div class="payment__user-head">
      <router-link to="/">
        <b-button variant="outline-primary" href="/">&larr; Назад</b-button>
      </router-link>

      <b-jumbotron class="payment__user-head__card">
        <h2>ID: {{ $route.params.id }}</h2>
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
          v-for="(arr, index) in user.pay.g2020"
          :key="index"
        >
          {{ arr }}
        </div>

        <button type="button" class="btn btn-warning btn-sm">
          Редактировать
        </button>

        <button
          @click="onDeleteUserPay(user.pay.g2020)"
          type="button"
          class="btn btn-danger btn-sm"
        >
          Удалить
        </button>
      </div>

      <b-button
        @click="onCheckoutPayments(user.pay.g2020)"
        type="button"
        variant="primary"
        >Расчитать (на руки)
      </b-button>

      <b-jumbotron header="Расчет" v-if="checkoutShow">
        <p>
          Сумма всех начислений за 2020 год:
          <b>{{ sumBeforeTax }} рублей (до вычета НДФЛ 13%)</b>
        </p>

        <p>
          Сумма всех начислений за 2020 год:
          <b>{{ sumAfterTax }} рублей (после вычета НДФЛ 13%)</b>
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
export default {
  name: "userPayInfo",
  data() {
    return {
      user: {},
      currencyYear: new Date().getFullYear(),
      selected: null,
      options: [
        { text: `Текущий: ${new Date().getFullYear()}`, value: null },
        { text: "2019", value: 1 },
        { text: "2018", value: 2 },
      ],
      checkoutShow: false,
      converterShow: false,
      ndfl: 13,
      sumBeforeTax: null,
      sumAfterTax: null,
      sumAfterEuro: null,
      sumAfterDollar: null,
      currencyCourseDollar: 80,
      currencyCourseEuro: 90,
      dollarhandle: false,
      eurohandle: false
    };
  },
  props: ["id"],
  methods: {
    onCheckoutPayments(arr) {
      let reducer = (acc, cur) => acc + cur;
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
      this.sumAfterDollar = this.sumAfterTax / this.currencyCourseDollar;
      this.dollarhandle = true;
    },
    convertEuro() {
      this.sumAfterEuro = this.sumAfterTax / this.currencyCourseEuro;
      this.eurohandle = true;
    },
    openConverter() {
      this.converterShow = true;
    },

    deleteUserPay() {
      if (confirm("Вы действительно хотите удалить информацию о доходе?")) {
        // axios
        //   .delete(`http://localhost:3000/users/5626/${pay}`)
        //   .then(() => {
        //     this.getUsers();
        //   })
        //   .catch((error) => {
        //     console.error(error);
        //     this.getUsers();
        //   });
        this.user.pay.g2020 = []
      }
    },

    onDeleteUserPay() {
      if (confirm("Вы действительно хотите удалить сотрудника?")) {
        this.deleteUserPay();
      }
    },

    getUsers() {
      const path = "http://localhost:3000/users";
      axios
        .get(path)
        .then((res) => {
          this.user = res.data.find((item) => item.id === "5626");
          console.log(this.user);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  created() {
    this.getUsers();
  },
};
</script>

<style scoped>
.payment {
  display: flex;
  flex-flow: column;
  width: 1200px;
  margin: 0 auto;
}
.payment__user-head {
  display: flex;
  flex-flow: row;
  height: 200px;
  width: 100%;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 25px;
}
.payment__user {
  font-size: 2.2em;
  color: rgb(56, 56, 56);
  text-align: left;
}

.payment__user i {
  border-radius: 10px;
  padding: 5px;
}

.payment__year-month {
  width: 100px;
  border: 1px solid #e7e7e7;
}
.payment__year-head {
  background: rgb(241, 241, 241);
  color: rgb(51, 51, 51);
  font-size: 1.1em;
}
.payment__year {
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  border: 1px solid #e7e7e7;
  height: 60px;
}
.payment__table {
  display: flex;
  flex-flow: column;
}
.payment__table .payment__year .payment__year-month {
  font-weight: 700;
}

.payment__year-body {
  height: 120px;
}
.converter {
  margin-top: 50px;
}
.converter button {
  margin: 5px;
}
.converterTotal {
  font-size: 1.2em;
  display: flex;
  flex-flow: column;
  align-items: right;
  justify-content: flex-end;
  text-align: center;
}

.payment__choose-year {
  display: flex;
  flex-flow: row;
  align-items: center;
  text-align: center;
  width: 200px;
}

.payment__choose-year span {
  margin-top: 17px;
  margin-right: 10px;
  font-size: 1.1em;
}

.payment__year-actions {
  width: 220px;
}

.payment__user-head__card {
  height: 250px;
}
</style>