import { createRouter, createWebHistory } from "vue-router";
import LogInForm from "../components/LogInForm.vue";
import CryptoCalc from "../components/CryptoCalc.vue";
import Signup from "../components/Signup.vue";
const routes = [
  {
    path: "/",
    name: "Login",
    component: LogInForm,
  },
  {
    path: "/tables",
    name: "CryptoCalc",
    component: CryptoCalc,
  },
  {
    path: "/signup",
    name: "Singup",
    component: Signup,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
