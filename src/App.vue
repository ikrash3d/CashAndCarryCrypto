<template>
  <header class="header">
    <h1>CashAndCarryCrypto.com</h1>

    <img src="./assets/btciconyellow.jpg" alt="btciconyellow" />
  </header>
  <div class="subheader">
    <i><p>Your quick and easy website to see the best yield per coin</p></i>
  </div>

  <crypto-calc> </crypto-calc>
</template>

<script>
import CryptoCalc from "./components/CryptoCalc.vue";

export default {
  name: "App",
  components: {
    CryptoCalc,
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap");

header {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
img {
  width: 70px;
  height: 70px;
  padding: 10px;
  margin-left: 10px;
}

.subheader i {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.subheader p {
  text-align: center;
  width: 70%;
  font-size: 15px;
  margin-top: 0px;
}

@media screen and (max-width: 480px) {
  .header h1 {
    font-size: 20px;
  }
  .header img {
    width: 50px;
    height: 50px;
    margin-left: 0px;
  }
}
</style>
