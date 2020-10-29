<template>
  <div class="v-table-row">
    <div class="row row__name">{{ userObj.name }}</div>
    <div class="row row__earned">{{ userObj.typeWork }}</div>
    <div class="row row__spent">{{ userObj.contract }}</div>

    <div class="row row__pay">
      <mark
        ><a href="#">{{ userObj.pay }} руб.</a></mark
      >
      <img class="row__pay-img" src="../../assets/calendar.png" />
    </div>

    <div class="row row__actions">
      <button v-b-modal.book-update-modal @click="editUser(userObj)">
        Редактировать
      </button>
      <button @click="removeWorker(index)">Удалить</button>
    </div>

    <b-modal
      ref="editUserModal"
      id="user-update-modal"
      title="Update"
      hide-footer
    >
      <b-form @submit="onSubmitUpdate" class="w-100">
        <b-form-group
          id="form-title-edit-group"
          label="Ф.И.О:"
          label-for="form-title-edit-input"
        >
          <b-form-input
            id="form-title-edit-input"
            type="text"
            v-model="editForm.name"
            required
          >
          </b-form-input>
        </b-form-group>

        <b-form-group
          id="form-typework-edit-group"
          label="Тип занятости:"
          label-for="form-typework-edit-input"
        >
          <b-form-input
            id="form-typework-edit-input"
            type="text"
            v-model="editForm.typeWork"
            required
          >
          </b-form-input>
        </b-form-group>

        <b-form-group
          id="form-contract-edit-group"
          label="Трудоустройство:"
          label-for="form-contract-edit-input"
        >
          <b-form-input
            id="form-contract-edit-input"
            type="text"
            v-model="editForm.contract"
            required
          >
          </b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Обновить</b-button>
      </b-form>
    </b-modal>
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
      editForm: {
        id: "",
        name: "",
        typeWork: "",
        contract: "",
      },
    };
  },

  methods: {
    removeWorker(index) {
      if (confirm("Вы действительно хотите удалить сотрудника?")) {
        this.$emit("onRemoveWorker", index);
      }
    },

    editUser(userObj) {
      this.editForm = userObj;
    },

    onSubmitUpdate(event) {
      event.preventDefault();
      this.$refs.editUserModal.hide();

      const payload = {
        name: this.editForm.name,
        typeWork: this.editForm.typeWork,
        contract: this.editForm.contract,
      };

      this.updateUser(payload, this.editForm.id);
    },

    updateUser(payload, userID) {
      console.log(payload, userID)
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
  align-items: center;
}
</style>