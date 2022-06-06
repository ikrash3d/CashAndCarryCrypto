<template>
  <div class="row justify-content-center">
    <div class="col-md-4 col-10 login">
      <form @submit.prevent="">
        <h1 class="h3 mb-3">Please sign in</h1>
        <div class="form-floating">
          <input v-model="username" type="text" class="form-control" id="floatingInput" placeholder="username" />
          <label for="floatingInput">Username</label>
        </div>
        <div class="form-floating mt-3">
          <input v-model="password" type="password" class="form-control" id="floatingPassword" placeholder="Password" />
          <label for="floatingPassword">Password</label>
        </div>
        <router-link to="/tables">
          <button class="w-100 btn btn-lg btn-primary mt-4 mb-3" type="submit">
            Sign in
          </button>
        </router-link>

        <!-- <router-link to="/signup">
          <button class="w-100 btn btn-lg btn-secondary mt-2 mb-3" type="submit">Sign up</button>
        </router-link> -->
      </form>
    </div>
    <div class="row justify-content-center mt-5">
      <b class="row justify-content-center">Pour vous connecter: </b>

      <b class="row justify-content-center mt-3"> Cliquez tout simplement sur Sign in</b>
      <br />
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
  data() {
    return {
      username: "",
      password: "",
      credentialUrl: "http://localhost:5000/api/login",
      answer: "",
    };
  },
  methods: {
    async sendCredentials() {
      const loginCredentials = {
        username: this.username,
        password: this.password,
      };
      try {
        const response = await fetch(this.credentialUrl, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(loginCredentials),
        });

        this.answer = await response.json();

        if (this.answer.statusCode === 401) {
          return this.wrongPasswordUsernameModal();
        }
        // this.$store.auth = true;
        this.$router.push({ name: "Tables" });
      } catch (error) {
        console.log(error);
      }
    },
    wrongPasswordUsernameModal() {
      return Swal.fire({
        position: "center",
        icon: "error",
        title: `Wrong password or username entered.\n\n Please try again.`,
        allowOutsideClick: false,
        time: 1500,
      });
    },
  },
};
</script>

<style scoped>
html,
body {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.form-signin .checkbox {
  font-weight: 400;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.login {
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  padding: 10px;
  margin-top: 10px;
  border-radius: 10px;
  text-align: center;
}
</style>
