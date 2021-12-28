<template>
  <div class="row justify-content-center">
    <div class="col-md-4 col-10 login">
      <h1 class="h3 mb-3">Please sign in</h1>

      <div class="form-floating">
        <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" />
        <label for="floatingInput">Email address</label>
      </div>
      <div class="form-floating mt-3">
        <input type="password" class="form-control" id="floatingPassword" placeholder="Password" />
        <label for="floatingPassword">Password</label>
      </div>
      <router-link to="/tables">
        <button class="w-100 btn btn-lg btn-primary mt-4 mb-3" type="submit">Sign in</button>
      </router-link>
      <router-link to="/signup">
        <button class="w-100 btn btn-lg btn-secondary mt-2 mb-3" type="submit">Sign up</button>
      </router-link>
    </div>
  </div>
</template>

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
