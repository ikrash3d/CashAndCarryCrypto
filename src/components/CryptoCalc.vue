<template>
  <div class="container">
    <div class="subContainer">
      <button @click="toggleBest">+</button>
      <h1 style="text-align:center">Best Futures</h1>
      <div v-if="showBest">
        <div class="displayDates">
          <label>Name</label>
          <label>
            Exp date : <b>{{ date_zero[0] }}/{{ date_zero[1] }}/{{ date_zero[2] }}</b>
            <p class="dateDisplay">YY/MM/DD</p></label
          >
          <label
            >Exp date: <b>{{ date_one[0] }}/{{ date_one[1] }}/{{ date_one[2] }}</b>
            <p class="dateDisplay">YY/MM/DD</p></label
          >
        </div>

        <crypto-coin
          :cryptoName="max_object_first_future.name"
          :firstContract="max_object_first_future.first_contract"
          secondContract="- "
          :img="max_object_first_future.img"
          :firstYearlyYield="max_object_first_future.first_yearly_yield"
          secondYearlyYield="- "
        >
        </crypto-coin>
        <crypto-coin
          :cryptoName="max_object_second_future.name"
          firstContract="- "
          :secondContract="max_object_second_future.second_contract"
          :img="max_object_second_future.img"
          firstYearlyYield="- "
          :secondYearlyYield="max_object_second_future.second_yearly_yield"
        >
        </crypto-coin>
      </div>
    </div>

    <div class="subContainer" style="margin-top: 40px;">
      <button @click="toggleLog">+</button>
      <h1 style="text-align:center">Futures Log</h1>
      <div v-if="showLog">
        <div class="displayDates">
          <label>Name</label>
          <label>
            Exp date : <b>{{ date_zero[0] }}/{{ date_zero[1] }}/{{ date_zero[2] }}</b>
            <p class="dateDisplay">YY/MM/DD</p>
          </label>
          <label
            >Exp date: <b>{{ date_one[0] }}/{{ date_one[1] }}/{{ date_one[2] }}</b>
            <p class="dateDisplay">YY/MM/DD</p>
          </label>
        </div>
        <crypto-coin
          v-for="(future, idx) in futures_array"
          :key="idx"
          :cryptoName="future.name"
          :firstContract="future.first_contract"
          :secondContract="future.second_contract"
          :img="future.img"
          :firstYearlyYield="future.first_yearly_yield"
          :secondYearlyYield="future.second_yearly_yield"
        >
        </crypto-coin>
      </div>
    </div>
  </div>
</template>

<script>
import CryptoCoin from "./CryptoCoin.vue";

export default {
  components: {
    CryptoCoin,
  },
  created() {
    this.dataGetter();
    this.media_frame = window.matchMedia("(max-width: 480px)");
  },
  data() {
    return {
      url: "https://dapi.binance.com//dapi/v1/ticker/bookTicker",
      max_object_first_future: {},
      max_object_second_future: {},
      showLog: false,
      showBest: false,
      date_zero: [],
      date_one: [],
      difference_days_zero: 0,
      difference_days_one: 0,
      media_frame: "",
      futures_array: [
        {
          name: "ADA",
          data: [],
          first_contract: 0,
          second_contract: 0,
          first_yearly_yield: 0,
          second_yearly_yield: 0,
          img: require("../assets/ada.svg"),
        },
        {
          name: "BCH",
          data: [],
          first_contract: 0,
          second_contract: 0,
          first_yearly_yield: 0,
          second_yearly_yield: 0,
          img: require("../assets/bch.svg"),
        },
        {
          name: "BNB",
          data: [],
          first_contract: 0,
          second_contract: 0,
          first_yearly_yield: 0,
          second_yearly_yield: 0,
          img: require("../assets/bnb.svg"),
        },
        {
          name: "BTC",
          data: [],
          first_contract: 0,
          second_contract: 0,
          first_yearly_yield: 0,
          second_yearly_yield: 0,
          img: require("../assets/btc.svg"),
        },
        {
          name: "DOGE",
          data: [],
          first_contract: 0,
          second_contract: 0,
          first_yearly_yield: 0,
          second_yearly_yield: 0,
          img: require("../assets/doge.svg"),
        },
        {
          name: "DOT",
          data: [],
          first_contract: 0,
          second_contract: 0,
          first_yearly_yield: 0,
          second_yearly_yield: 0,
          img: require("../assets/dot.svg"),
        },
        {
          name: "EGLD",
          data: [],
          first_contract: 0,
          second_contract: 0,
          first_yearly_yield: 0,
          second_yearly_yield: 0,
          img: require("../assets/egld.svg"),
        },
        {
          name: "EOS",
          data: [],
          first_contract: 0,
          second_contract: 0,
          first_yearly_yield: 0,
          second_yearly_yield: 0,
          img: require("../assets/eos.svg"),
        },
        {
          name: "ETC",
          data: [],
          first_contract: 0,
          second_contract: 0,
          first_yearly_yield: 0,
          second_yearly_yield: 0,
          img: require("../assets/etc.svg"),
        },
        {
          name: "ETH",
          data: [],
          first_contract: 0,
          second_contract: 0,
          first_yearly_yield: 0,
          second_yearly_yield: 0,
          img: require("../assets/eth.svg"),
        },
        {
          name: "FIL",
          data: [],
          first_contract: 0,
          second_contract: 0,
          first_yearly_yield: 0,
          second_yearly_yield: 0,
          img: require("../assets/fil.svg"),
        },
        {
          name: "LINK",
          data: [],
          first_contract: 0,
          second_contract: 0,
          first_yearly_yield: 0,
          second_yearly_yield: 0,
          img: require("../assets/link.svg"),
        },
        {
          name: "LTC",
          data: [],
          first_contract: 0,
          second_contract: 0,
          first_yearly_yield: 0,
          second_yearly_yield: 0,
          img: require("../assets/ltc.svg"),
        },
        {
          name: "THETA",
          data: [],
          first_contract: 0,
          second_contract: 0,
          first_yearly_yield: 0,
          second_yearly_yield: 0,
          img: require("../assets/theta.svg"),
        },
        {
          name: "TRX",
          data: [],
          first_contract: 0,
          second_contract: 0,
          first_yearly_yield: 0,
          second_yearly_yield: 0,
          img: require("../assets/trx.svg"),
        },
        {
          name: "UNI",
          data: [],
          first_contract: 0,
          second_contract: 0,
          first_yearly_yield: 0,
          second_yearly_yield: 0,
          img: require("../assets/uni.svg"),
        },
        {
          name: "XLM",
          data: [],
          first_contract: 0,
          second_contract: 0,
          first_yearly_yield: 0,
          second_yearly_yield: 0,
          img: require("../assets/xlm.svg"),
        },
        {
          name: "XRP",
          data: [],
          first_contract: 0,
          second_contract: 0,
          first_yearly_yield: 0,
          second_yearly_yield: 0,
          img: require("../assets/xrp.svg"),
        },
      ],
    };
  },
  methods: {
    toggleLog() {
      this.showLog = !this.showLog;
    },
    toggleBest() {
      this.showBest = !this.showBest;
    },
    async dataGetter() {
      setInterval(async () => {
        this.resetData(this.futures_array);
        const response = await fetch(this.url, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        for (let prop in data) {
          if (data[prop]["pair"] === "BTCUSD") {
            this.futures_array[3].data.push(data[prop]);
          }
          if (data[prop]["pair"] === "ETHUSD") {
            this.futures_array[9].data.push(data[prop]);
          }
          if (data[prop]["pair"] === "LINKUSD") {
            this.futures_array[11].data.push(data[prop]);
          }
          if (data[prop]["pair"] === "BNBUSD") {
            this.futures_array[2].data.push(data[prop]);
          }
          if (data[prop]["pair"] === "TRXUSD") {
            this.futures_array[14].data.push(data[prop]);
          }
          if (data[prop]["pair"] === "DOTUSD") {
            this.futures_array[5].data.push(data[prop]);
          }
          if (data[prop]["pair"] === "ADAUSD") {
            this.futures_array[0].data.push(data[prop]);
          }
          if (data[prop]["pair"] === "EOSUSD") {
            this.futures_array[7].data.push(data[prop]);
          }
          if (data[prop]["pair"] === "LTCUSD") {
            this.futures_array[12].data.push(data[prop]);
          }
          if (data[prop]["pair"] === "BCHUSD") {
            this.futures_array[1].data.push(data[prop]);
          }
          if (data[prop]["pair"] === "XRPUSD") {
            this.futures_array[17].data.push(data[prop]);
          }
          if (data[prop]["pair"] === "ETCUSD") {
            this.futures_array[8].data.push(data[prop]);
          }
          if (data[prop]["pair"] === "FILUSD") {
            this.futures_array[10].data.push(data[prop]);
          }
          if (data[prop]["pair"] === "EGLDUSD") {
            this.futures_array[6].data.push(data[prop]);
          }
          if (data[prop]["pair"] === "DOGEUSD") {
            this.futures_array[4].data.push(data[prop]);
          }
          if (data[prop]["pair"] === "UNIUSD") {
            this.futures_array[15].data.push(data[prop]);
          }
          if (data[prop]["pair"] === "THETAUSD") {
            this.futures_array[13].data.push(data[prop]);
          }
          if (data[prop]["pair"] === "XLMUSD") {
            this.futures_array[16].data.push(data[prop]);
          }
        }

        this.getDates();
        this.calculateDifferenceDay();
        for (const coins in this.futures_array) {
          this.calculateFutures(this.futures_array[coins]);
        }
        this.findMaxValue(this.futures_array);
      }, 2000);
    },
    getDates() {
      const btc = this.futures_array[0];
      const date1 = btc.data[1].symbol;
      const date2 = btc.data[2].symbol;
      const format1 = date1.split("_");
      const format2 = date2.split("_");
      this.date_zero = format1[1].match(/.{1,2}/g);
      this.date_one = format2[1].match(/.{1,2}/g);
    },
    resetData(array) {
      for (const coin in array) {
        array[coin].data = [];
      }
    },
    calculateFutures(object) {
      object.first_contract = 0;
      object.second_contract = 0;
      object.first_yearly_yield = 0;
      object.second_yearly_yield = 0;

      if (object.data.length === 2) {
        if (this.media_frame.matches) {
          object.first_contract = parseFloat(
            ((object.data[1].bidPrice / object.data[0].bidPrice - 1) * 100).toFixed(3)
          );
        } else {
          object.first_contract = parseFloat(
            ((object.data[1].bidPrice / object.data[0].bidPrice - 1) * 100).toFixed(7)
          );
        }
      }
      if (object.data.length === 3) {
        if (this.media_frame.matches) {
          object.first_contract = parseFloat(
            ((object.data[1].bidPrice / object.data[0].bidPrice - 1) * 100).toFixed(3)
          );
          object.second_contract = parseFloat(
            ((object.data[2].bidPrice / object.data[0].bidPrice - 1) * 100).toFixed(3)
          );
          object.first_yearly_yield = parseFloat(
            (Math.pow(1 + object.first_contract / 100, 365 / this.difference_days_zero) - 1) * 100
          ).toFixed(3);
          object.second_yearly_yield = parseFloat(
            (Math.pow(1 + object.second_contract / 100, 365 / this.difference_days_one) - 1) * 100
          ).toFixed(3);
        } else {
          object.first_contract = parseFloat(
            ((object.data[1].bidPrice / object.data[0].bidPrice - 1) * 100).toFixed(7)
          );
          object.second_contract = parseFloat(
            ((object.data[2].bidPrice / object.data[0].bidPrice - 1) * 100).toFixed(7)
          );
          object.first_yearly_yield = parseFloat(
            (Math.pow(1 + object.first_contract / 100, 365 / this.difference_days_zero) - 1) * 100
          ).toFixed(7);
          object.second_yearly_yield = parseFloat(
            (Math.pow(1 + object.second_contract / 100, 365 / this.difference_days_one) - 1) * 100
          ).toFixed(7);
        }
      }
    },
    findMaxValue(array) {
      let max_first_future = Math.max(...array.map((value) => value.first_contract));
      let max_second_future = Math.max(...array.map((value) => value.second_contract));
      this.max_object_first_future = array.find((value) => value.first_contract === max_first_future);
      this.max_object_second_future = array.find((value) => value.second_contract === max_second_future);
    },
    calculateDifferenceDay() {
      const date_zero = this.date_zero[1] + "/" + this.date_zero[2] + "/" + "20" + this.date_zero[0];
      const date_one = this.date_one[1] + "/" + this.date_one[2] + "/" + "20" + this.date_one[0];
      const end_date_zero = new Date(date_zero);
      const end_date_one = new Date(date_one);
      const today_date = new Date();
      const diffTime_zero = Math.abs(end_date_zero - today_date);
      const diffTime_one = Math.abs(end_date_one - today_date);
      this.difference_days_zero = Math.ceil(diffTime_zero / (1000 * 60 * 60 * 24));
      this.difference_days_one = Math.ceil(diffTime_one / (1000 * 60 * 60 * 24));
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap");

label {
  font-size: 25px;
  text-align: center;
  padding: 10px;
}
.container {
  border-radius: 10px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.subContainer {
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  padding: 20px;
  border-radius: 10px;
  width: 70%;
}

.displayCoins,
.displayDates {
  display: grid;
  grid-template-columns: 33% 33% 33%;
  grid-template-rows: auto;
  justify-content: center;
  align-items: center;
  padding: 5px;
  margin-top: 10px;
}

.displayCoins {
  border-radius: 5px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
}

.bestFuture {
  display: grid;
  grid-template-columns: 33% 33% 33%;
  grid-template-rows: auto;
  justify-content: center;
  align-items: center;
  padding: 5px;
  border-radius: 5px;
  margin-top: 10px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
}

.bestFuture div {
  display: grid;
  justify-content: center;
  align-items: center;
  padding: 5px;
}
button {
  background-color: white;
  border-radius: 10px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px;
  width: 30px;
  height: 30px;
  margin: 0;
  cursor: pointer;
}

button:hover {
  background-color: rgb(206, 200, 200);
}

button {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.coin {
  display: grid;
  grid-template-columns: 25% 15%;
  align-items: center;
  justify-content: center;
  display: flex;
}

.info {
  display: grid;
  justify-content: center;
  align-items: center;
  padding: 5px;
}

.empty {
  text-align: center;
}
.dateDisplay {
  font-size: 15px;
  font-style: italic;
  opacity: 0.7;
  margin: 0;
  margin-top: 10px;
}

@media screen and (max-width: 480px) {
  .subContainer {
    width: 85%;
  }
  label {
    font-size: 15px;
  }
  .dateDisplay {
    font-size: 10px;
  }

  .coin {
    display: flex;
    justify-content: flex-start;
    align-self: center;
  }

  .coin p {
    margin: 0;
    margin-left: 10px;
    font-size: 14px;
  }
}
</style>
