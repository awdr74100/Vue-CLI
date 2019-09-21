<template>
  <div class="addToCart">
    <div class="cart" @click="cartActive = !cartActive" :class="{'cart--active':cartActive}">
      <p class="event" :class="{'event--active':cartActive}">PAY</p>
      <span class="count">
        <p>8</p>
      </span>
    </div>
    <div class="cartList" :class="{'cartList--active':cartActive}">
      <h4>近期加入商品</h4>
      <ul class="list">
        <li class="list__item">
          <div class="content">
            <div class="img"></div>
            <div class="product">
              <p class="name">多利明 Torumin HLP 紅蚯蚓酵素(120粒)</p>
              <p class="unit">1<span> / </span>包</p>
            </div>
          </div>
          <div class="doing">
            <p>NT$48562</p>
            <span>刪除</span>
          </div>
        </li>
      </ul>
      <div class="goCart">
        <p class="total">總共：<span>NT$68590</span></p>
        <button>查看並結帳</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['update'],
    data() {
      return {
        cartActive: false,
      }
    },
    created() {
      const vm = this;
      const url = `${process.env.API_Server}/api/${process.env.API_Path}/cart`;
      vm.$http.get(url).then((response) => {
        console.log(response.data);
      })
    }
  }

</script>
