<template>
  <div class="row justify-content-center mb-5">
    <form @submit.prevent="sendUserInfo" class="row g-3 col-md-8 col-10 login">
      <h1 class="h3 mb-3">Please fill out this form</h1>
      <div class="col-md-6">
        <label for="inputEmail4" class="form-label">Email</label>
        <input v-model="userEmail" type="email" class="form-control" id="inputEmail4" />
      </div>
      <div class="col-md-6">
        <label for="inputPassword4" class="form-label">Password</label>
        <input v-model="userPassword" type="password" class="form-control" id="inputPassword4" />
      </div>
      <div class="col-12">
        <label for="inputAddress" class="form-label">Address</label>
        <input v-model="userAddress" type="text" class="form-control" id="inputAddress" placeholder="1234 Main St" />
      </div>

      <div class="col-md-6">
        <label for="inputCity" class="form-label">City</label>
        <input v-model="userCity" type="text" class="form-control" id="inputCity" />
      </div>
      <div class="col-md-4">
        <label for="inputState" class="form-label">Province</label>
        <select v-model="userProvince" id="inputState" class="form-select">
          <option selected hidden>Choose...</option>
          <option v-for="(province, id) in provinces" :key="id">{{ province.name }}</option>
        </select>
      </div>
      <div class="col-md-2">
        <label for="inputZip" class="form-label">Zip</label>
        <input v-model="userZip" type="text" class="form-control" id="inputZip" placeholder="K1A 0B1" />
      </div>

      <div class="col-12">
        <button @click="sendUserInfo" class="btn-lg mt-2 w-50 btn-primary">Sign up</button>
      </div>
    </form>
  </div>
</template>
<script>
import Swal from "sweetalert2";
export default {
  data() {
    return {
      provinceUrl: "http://localhost:5000/api/provinces",
      addUserUrl: "http://localhost:5000/api/users",
      provinces: [],
      userEmail: "",
      userPassword: "",
      userAddress: "",
      userCity: "",
      userProvince: "",
      userZip: "",
      response: "",
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const response = await fetch(this.provinceUrl, {
        headers: {
          "Content-type": "application/json",
        },
      });
      const content = await response.json();
      this.provinces = content.data.data;
    },
    async sendUserInfo() {
      const newUser = this.createNewUser();
      this.confirmModal(newUser).then(async (confirmResult) => {
        try {
          if (confirmResult.isConfirmed) {
            if (this.response.status === 201) {
              this.successModal().then((successResult) => {
                if (successResult.isConfirmed) {
                  this.$router.push({ name: "Login" });
                }
              });
            } else {
              this.errorModal();
            }
          }
        } catch (error) {
          this.errorModal();
        }
      });
    },
    errorModal() {
      return Swal.fire({
        position: "center",
        icon: "error",
        title: "An issue has occured, please try again later",
        allowOutsideClick: false,
        time: 1500,
      });
    },
    successModal() {
      return Swal.fire({
        position: "center",
        icon: "success",
        title: "Your account has been created",
        allowOutsideClick: false,
        confirmButtonColor: "#0d6efd",
        time: 1500,
      });
    },
    confirmModal(newUser) {
      return Swal.fire({
        title: "Are you sure?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#0d6efd",
        cancelButtonColor: "#d33",
        showLoaderOnConfirm: true,
        confirmButtonText: "Create account!",
        allowOutsideClick: false,
        preConfirm: async () => {
          this.response = await fetch(this.addUserUrl, {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: newUser,
          });
        },
      });
    },
    createNewUser() {
      return JSON.stringify({
        userEmail: this.userEmail,
        userPassword: this.userPassword,
        userAddress: this.userAddress,
        userCity: this.userCity,
        userProvince: this.userProvince,
        userZip: this.userZip,
      });
    },
  },
};
</script>
<style scoped>
.login {
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  padding: 10px;
  margin-top: 20px;
  border-radius: 10px;
  text-align: center;
}
</style>
