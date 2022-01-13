<template>
  <div class="row justify-content-center mb-5">
    <form @submit.prevent="" class="row g-4 col-8 login needs-validation" novalidate>
      <div class="justify-content-center align-content-center">
        <div class="col-12 mt-3">
          <label for="validationCustom01" class="form-label">Username</label>
          <input v-model="userName" type="text" class="form-control" id="validationCustom01" required />
          <div class="invalid-feedback">
            Please provide a username.
          </div>
        </div>

        <div class="col-12 mt-3">
          <label for="validationCustom02" class="form-label">Password</label>
          <input v-model="userPassword" type="password" class="form-control" id="validationCustom02" required />
          <div class="invalid-feedback">
            Please provide a password.
          </div>
        </div>
        <div class="col-12">
          <label for="validationCustomUsername" class="form-label">Email</label>
          <div class="input-group has-validation">
            <span class="input-group-text" id="inputGroupPrepend">@</span>
            <input
              v-model="userEmail"
              type="email"
              class="form-control"
              id="validationCustomUsername"
              aria-describedby="inputGroupPrepend"
              required
            />
            <div class="invalid-feedback">
              Please provide a valid email.
            </div>
          </div>
        </div>
        <div class="col-12 mt-3">
          <label for="validationCustom03" class="form-label">Address</label>
          <input v-model="userAddress" type="text" class="form-control" id="validationCustom03" required />
          <div class="invalid-feedback">
            Please provide an address.
          </div>
        </div>
        <div class="col-12 mt-3">
          <label for="validationCustom04" class="form-label">City</label>
          <input v-model="userCity" type="text" class="form-control" id="validationCustom04" required />
          <div class="invalid-feedback">
            Please provide a valid city.
          </div>
        </div>
        <div class="col-12 mt-3">
          <label for="validationCustom05" class="form-label">State</label>
          <select v-model="userProvince" class="form-select" id="validationCustom05" required>
            <option selected hidden>Choose...</option>
            <option v-for="(province, id) in provinces" :key="id">{{ province.name }}</option>
          </select>
          <div class="invalid-feedback">
            Please select a province.
          </div>
        </div>
        <div class="col-12 mt-3">
          <label for="validationCustom06" class="form-label">Zip</label>
          <input
            v-model="userZip"
            type="text"
            class="form-control"
            placeholder="K1A 0B1"
            id="validationCustom06"
            required
          />
          <div class="invalid-feedback">
            Please provide a valid zip code.
          </div>
        </div>
      </div>

      <div class="col-12">
        <button @click="sendUserInfo()" type="submit" class="btn-lg mt-2 w-50 btn-primary">Sign up</button>
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
      userName: "",
      userPassword: "",
      userEmail: "",
      userAddress: "",
      userCity: "",
      userProvince: "",
      userZip: "",
      response: "",
      filled: true,
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
      this.validate();
      const newUser = this.createNewUser();
      const jsonUser = JSON.parse(newUser);
      for (let value of Object.entries(jsonUser)) {
        if (value["1"] === "") {
          this.filled = false;
        } else {
          this.filled = true;
        }
      }
      if (this.filled) {
        this.confirmModal(newUser).then(async (confirmResult) => {
          try {
            if (confirmResult.isConfirmed) {
              if (this.response.status === 409) {
                return this.userExistModal();
              }
              if (this.response.status === 201) {
                this.successModal().then((successResult) => {
                  if (successResult.isConfirmed) {
                    this.filled = true;
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
      } else {
        this.fillModal();
      }
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
    userExistModal() {
      return Swal.fire({
        position: "center",
        icon: "error",
        title: `The username: "${this.userName}" is already being used.\n\n Please chose an other one.`,
        allowOutsideClick: false,
        time: 1500,
      });
    },
    fillModal() {
      return Swal.fire({
        position: "center",
        icon: "error",
        title: "Please fill the missing fields",
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
        userName: this.userName,
        userPassword: this.userPassword,
        userEmail: this.userEmail,
        userAddress: this.userAddress,
        userCity: this.userCity,
        userProvince: this.userProvince,
        userZip: this.userZip,
      });
    },
    async validate() {
      await (async () => {
        "use strict";

        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.querySelectorAll(".needs-validation");

        // Loop over them and prevent submission
        Array.prototype.slice.call(forms).forEach(async (form) => {
          form.addEventListener(
            "submit",
            async (event) => {
              if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
              }
              form.classList.add("was-validated");
            },
            false
          );
        });
      })();
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
