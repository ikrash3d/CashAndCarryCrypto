<template>
  <div class="displayCoins">
    <div class="coin">
      <img :src="img" />
      <p>{{ cryptoName }}</p>
    </div>
    <div>
      <div>
        <b>{{ firstContract }}%</b>
      </div>
      <div>
        <i
          ><p>Yearly Yield:</p>
          {{ firstYearlyYield }} %</i
        >
      </div>
    </div>
    <div>
      <div>
        <b>{{ secondContract }}%</b>
      </div>
      <div>
        <i
          ><p>Yearly Yield:</p>
          {{ secondYearlyYield }}%</i
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["cryptoName", "firstContract", "secondContract", "img", "firstYearlyYield", "secondYearlyYield"],
};
</script>

<style scoped>
.coin {
  display: grid;
  grid-template-columns: 25% 15%;
  align-self: center;
}
i {
  text-align: center;
}
div {
  display: grid;
  justify-content: center;
  align-items: center;
  padding-top: 5px;
}

@media screen and (max-width: 480px) {
  div {
    justify-content: center;
  }
  .coin {
    display: flex;
    justify-content: flex-start;
    align-self: center;
  }
  i {
    text-align: center;
  }
  i p {
    font-size: 10px;
  }

  .coin p {
    margin: 0;
    margin-left: 10px;
    font-size: 14px;
  }
}
</style>
