<template>
  <div>
    <Header></Header>
    <div class="row justify-content-center">
      <div class="col-12">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./components/Header.vue";

export default {
  name: "App",
  components: {
    Header,
  },
  data() {
    return {
      mediaFrame: "",
      url: "https://ftx.com/api/futures",
    };
  },
  async created() {
    // setInterval(async () => {
    //   const response = await fetch(this.url, {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });
    //   console.log(response);
    // }, 5000);

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
}

.subContainer:focus {
  background-color: none;
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

  .subContainer:hover {
    background-color: none;
  }

  .subContainer:active {
    background-color: rgb(93, 117, 240);
  }
}
</style>
