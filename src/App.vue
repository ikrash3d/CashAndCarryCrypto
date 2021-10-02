<template>
  <div class="app">
    <header class="header">
      <h1>CashAndCarryCrypto.com</h1>
      <img class="btcSymbol" src="./assets/btciconyellow.jpg" alt="btciconyellow" />
    </header>
    <div class="subheader">
      <i><p>Your quick and easy website to see the best yield per coin</p></i>
    </div>
    <div class="subContainer">
      <a href="https://coinmarketcap.com/">
        <img class="coinMarketcap" src="./assets/coinmarketcap.png" alt="coinmarketcap" />
      </a>
    </div>
    <crypto-calc> </crypto-calc>
  </div>
</template>

<script>
import CryptoCalc from "./components/CryptoCalc.vue";

export default {
  name: "App",
  components: {
    CryptoCalc,
  },
  data() {
    return {
      mediaFrame: "",
    };
  },
  created() {
    this.mediaFrame = window.matchMedia(window.matchMedia("(max-width: 480px)"));
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap");
a {
  display: flex;
  justify-content: center;
  align-items: center;
}
.app {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

header {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.title {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
}
.btcSymbol {
  width: 70px;
  height: 70px;
  padding: 10px;
  margin-left: 10px;
}

.coinMarketcap {
  width: 60%;
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

.subContainer {
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  padding: 10px;
  margin-bottom: 30px;
  border-radius: 10px;
  width: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.subContainer:hover {
  background-color: rgb(93, 117, 240);
  color: white;
}

@media screen and (max-width: 480px) {
  .header h1 {
    font-size: 20px;
  }
  .btcSymbol {
    width: 50px;
    height: 50px;
    margin-left: 0px;
  }
  .subContainer {
    width: 60%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
