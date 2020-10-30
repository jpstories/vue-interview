<template>
  <div class="payment">
    <div class="payment__user-head">

      <div class="payment__user">
          <h1>Горячая Анастасия Евгеньевна</h1>
          <i>Дизайнер</i>
      </div>

      <div>
        <b-form-select
            v-model="typeWork"
            :options="[
            { text: 'Выберите год' },
            '2018',
            '2019',
            '2020',
            ]"
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
      </div>

      <div class="payment__year payment__year-body">
        <div
          class="payment__year-month"
          v-for="(year, index) in yearPayments"
          :key="index"
        >
          {{ year }} руб.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PaymentInfo",
  data: () => ({
    yearPayments: [50000, 50000, 60000, 65000, 65000, 66000, 70000, 80000, 90000, 115000, 110000, 102000],
  }),
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
    background: linear-gradient(45deg, rgb(67, 128, 241), rgb(37, 28, 168));
    align-items: center;
    justify-content: space-around;
}
.payment__user {
    font-size: 2.2em;
    color: rgb(241, 241, 241);
    text-align: left;
}
.payment__user h1 {
    background: rgb(51, 51, 51);
    border-radius: 10px;
}

.payment__user i {
    background: rgb(18, 54, 119);
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
</style>