<template>
  <div class="v-table">
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">
            <span>Ф.И.О</span>
            <img
              @click="sortByName"
              class="v-table__money-sort"
              :style="rotatedName ? { transform: `rotateX(${turn}deg)` } : null"
              src="../../assets/sort5.png"
              alt="orderName"
              v-if="users.length > 1"
            />
          </th>

          <th scope="col"><span>Тип занятости</span></th>
          <th scope="col"><span>Трудоустройство</span></th>

          <th scope="col">
            <span>Зарплата</span>
            <img
              @click="sortByPrice"
              class="v-table__money-sort"
              :style="
                rotatedProfit ? { transform: `rotateX(${turn}deg)` } : null
              "
              src="../../assets/sort5.png"
              alt="orderProfit"
              v-if="users.length > 1"
            />
          </th>

          <th></th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(user, index) in paginatedUsers" :key="index">
          <td>{{ user.name }}</td>
          <td>{{ user.typeWork }}</td>
          <td>{{ user.contract }}</td>
          <td>
            <span>{{ user.pay }} руб.</span>
            <img class="calendar" src="../../assets/calendar.png" />
          </td>
          <td>
            <button type="button" class="btn btn-warning btn-sm">
              Редактировать
            </button>
            <button type="button" class="btn btn-danger btn-sm" @click="onDeleteUser(index, user)">
              Удалить {{ user.id }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="v-table__empty" v-if="!users.length">
      <h3>Пока еще нет сотрудников :(</h3>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="512pt"
        viewBox="0 -12 512.00032 512"
        width="512pt"
      >
        <path
          d="m440.929688 375.699219-184.929688 101.546875-184.929688-101.546875v-203.089844l184.929688-101.546875 184.929688 101.546875zm0 0"
          fill="#ffb954"
        />
        <path
          d="m71.070312 172.609375v.003906l184.929688 101.546875 184.929688-101.546875v-.003906l-184.929688-101.546875zm0 0"
          fill="#fea02c"
        />
        <path
          d="m71.070312 172.671875v203.027344l184.929688 101.546875.109375-.058594v-203.03125l-184.929687-101.546875zm0 0"
          fill="#ffc66c"
        />
        <g fill="#feda9b">
          <path
            d="m440.929688 172.613281 61.070312 61.066407-184.929688 101.546874-61.070312-61.070312zm0 0"
          />
          <path
            d="m71.070312 172.613281-61.070312 61.066407 184.929688 101.546874 61.070312-61.070312zm0 0"
          />
          <path
            d="m440.929688 172.613281 61.070312-61.066406-184.929688-101.546875-61.070312 61.070312zm0 0"
          />
          <path
            d="m71.070312 172.613281-61.070312-61.066406 184.929688-101.546875 61.070312 61.070312zm0 0"
          />
        </g>
        <path
          d="m455.074219 172.613281 53.996093-53.996093c2.226563-2.222657 3.273438-5.367188 2.828126-8.480469-.441407-3.113281-2.328126-5.839844-5.085938-7.355469l-64.914062-35.644531c-4.839844-2.65625-10.917969-.886719-13.578126 3.953125-2.65625 4.84375-.890624 10.921875 3.953126 13.578125l53.234374 29.230469-46.339843 46.335937-166.667969-91.519531 46.335938-46.335938 46.839843 25.722656c4.839844 2.65625 10.921875.890626 13.578125-3.953124 2.660156-4.839844.890625-10.921876-3.953125-13.578126l-53.417969-29.335937c-3.898437-2.140625-8.742187-1.449219-11.882812 1.695313l-54 54-54-54c-3.144531-3.144532-7.988281-3.832032-11.882812-1.695313l-184.929688 101.546875c-2.757812 1.515625-4.644531 4.238281-5.085938 7.355469-.445312 3.113281.601563 6.257812 2.828126 8.480469l53.996093 53.996093-53.996093 53.992188c-2.226563 2.226562-3.273438 5.367187-2.828126 8.484375.441407 3.113281 2.328126 5.839844 5.085938 7.351562l55.882812 30.6875v102.570313c0 3.652343 1.988282 7.011719 5.1875 8.769531l184.929688 101.542969c1.5.824219 3.15625 1.234375 4.8125 1.234375s3.3125-.410156 4.8125-1.234375l184.929688-101.542969c3.199218-1.757812 5.1875-5.117188 5.1875-8.769531v-102.570313l55.882812-30.683594c2.757812-1.515624 4.644531-4.242187 5.085938-7.355468.445312-3.113282-.601563-6.257813-2.828126-8.480469zm-199.074219 90.132813-164.152344-90.136719 164.152344-90.140625 164.152344 90.140625zm-62.832031-240.367188 46.332031 46.335938-166.667969 91.519531-46.335937-46.335937zm-120.328125 162.609375 166.667968 91.519531-46.339843 46.339844-166.671875-91.519531zm358.089844 184.796875-164.929688 90.5625v-102.222656c0-5.523438-4.476562-10-10-10s-10 4.476562-10 10v102.222656l-164.929688-90.5625v-85.671875l109.046876 59.878907c1.511718.828124 3.167968 1.234374 4.808593 1.234374 2.589844 0 5.152344-1.007812 7.074219-2.929687l54-54 54 54c1.921875 1.925781 4.484375 2.929687 7.074219 2.929687 1.640625 0 3.296875-.40625 4.808593-1.234374l109.046876-59.878907zm-112.09375-46.9375-46.339844-46.34375 166.667968-91.515625 46.34375 46.335938zm0 0"
        />
        <path
          d="m404.800781 68.175781c2.628907 0 5.199219-1.070312 7.070313-2.933593 1.859375-1.859376 2.929687-4.4375 2.929687-7.066407 0-2.632812-1.070312-5.210937-2.929687-7.070312-1.859375-1.863281-4.441406-2.929688-7.070313-2.929688-2.640625 0-5.210937 1.066407-7.070312 2.929688-1.871094 1.859375-2.929688 4.4375-2.929688 7.070312 0 2.628907 1.058594 5.207031 2.929688 7.066407 1.859375 1.863281 4.441406 2.933593 7.070312 2.933593zm0 0"
        />
        <path
          d="m256 314.925781c-2.628906 0-5.210938 1.066407-7.070312 2.929688-1.859376 1.867187-2.929688 4.4375-2.929688 7.070312 0 2.636719 1.070312 5.207031 2.929688 7.078125 1.859374 1.859375 4.441406 2.921875 7.070312 2.921875s5.210938-1.0625 7.070312-2.921875c1.859376-1.871094 2.929688-4.441406 2.929688-7.078125 0-2.632812-1.070312-5.203125-2.929688-7.070312-1.859374-1.863281-4.441406-2.929688-7.070312-2.929688zm0 0"
        />
      </svg>
    </div>

    <v-table-add @addHandlerUser="addHandlerUser" />

    <div class="v-table__pagination" v-if="users.length > 10">
      <div
        class="page"
        v-for="(page, index) in pages"
        :key="index"
        :class="{ page__selected: page === pageNumber }"
        @click="pageClick(page)"
      >
        {{ page }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import VTableAdd from "./v-table-add.vue";

export default {
  name: "v-table",
  components: {
    VTableAdd,
  },

  data() {
    return {
      users: [],
      usersPerPage: 10,
      pageNumber: 1,
      rotatedProfit: false,
      rotatedName: false,
      turn: 180,
    };
  },

  computed: {
    pages() {
      return Math.ceil(this.users.length / 10);
    },
    paginatedUsers() {
      let from = (this.pageNumber - 1) * this.usersPerPage;
      let to = from + this.usersPerPage;
      return this.users.slice(from, to);
    },
  },

  methods: {
    getUsers() {
      const path = "http://localhost:3000/users";
      axios
        .get(path)
        .then((res) => {
          this.users = res.data;
          console.log(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    pageClick(page) {
      this.pageNumber = page;
    },

    addHandlerUser(userAddObj) {
      const path = "http://localhost:3000/users";
      // this.users.push(userAddObj);
      axios.post(path, userAddObj).then(() => this.getUsers());
    },

    deleteUser(userID) {
      axios
        .delete(`http://localhost:3000/users/${userID}`)
        .then(() => {
          this.getUsers();
        })
        .catch((error) => {
          console.error(error);
          this.getUsers();
        });
    },

    onDeleteUser(index, user) {
      if (confirm("Вы действительно хотите удалить сотрудника?")) {
        this.users.splice(index, 1);
        console.log(user);
        this.deleteUser(user.id);
      }
    },

    sortByName() {
      this.rotatedName = !this.rotatedName;
      this.rotatedName
        ? this.users.sort((a, b) => a.name.localeCompare(b.name))
        : this.users.sort((a, b) => b.name.localeCompare(a.name));
    },

    sortByPrice() {
      this.rotatedProfit = !this.rotatedProfit;
      this.rotatedProfit
        ? this.users.sort((a, b) => a.pay - b.pay)
        : this.users.sort((a, b) => b.pay - a.pay);
    },
  },

  created() {
    this.getUsers();
  },
};
</script>

<style scoped>
.v-table {
  max-width: 1280px;
  margin: 0 auto;
}

.v-table__pagination {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 15px;
}

.v-table__empty {
  min-height: 100px;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
}

.v-table__empty svg {
  width: 150px;
  height: 150px;
}

.v-table img {
  width: 26px;
  height: 30px;
  cursor: pointer;
  margin-left: 5px;
}

.v-table img:hover {
  transform: scale(0.9);
}

.v-table__money-sort {
  transition: 0.2s;
  width: 30px !important;
}

.page {
  padding: 8px;
  border: 1px solid #e7e7e7;
  margin-right: 15px;
}
.page:hover {
  background: #accccc;
  cursor: pointer;
  color: white;
}
.page__selected {
  background: #accccc;
  cursor: pointer;
  color: white;
}
.calendar {
  cursor: pointer;
}
.table thead th {
  vertical-align: top !important;
}
</style>