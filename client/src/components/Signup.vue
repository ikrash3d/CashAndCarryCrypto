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
        <input v-model="userZip" type="text" class="form-control" id="inputZip" />
      </div>

      <div class="col-12">
        <button @click="sendUserInfo" class="btn-lg mt-2 w-50 btn-primary">Sign in</button>
      </div>
    </form>
  </div>
</template>
<script>
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
      console.log(this.provinces);
    },
    async sendUserInfo() {
      const newUser = JSON.stringify({
        userEmail: this.userEmail,
        userPassword: this.userPassword,
        userAddress: this.userAddress,
        userCity: this.userCity,
        userProvince: this.userProvince,
        userZip: this.userZip,
      });
      try {
        const response = await fetch(this.addUserUrl, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },

          body: newUser,
        });
        console.log(newUser);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
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
