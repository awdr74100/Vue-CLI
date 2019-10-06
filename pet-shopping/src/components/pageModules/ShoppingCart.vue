<template>
  <div class="shoppingCart">
    <div class="cart" @click="cartVisibility = !cartVisibility" :class="{'cart--active':cartVisibility}">
      <p class="event" :class="{'event--active':cartVisibility}">PAY</p>
      <span class="count">
        <p>{{cartProductLen}}</p>
      </span>
    </div>
    <div class="cartList" :class="{'cartList--active':cartVisibility}">
      <div class="top">
        <p>近期加入商品</p>
        <span @click="cartVisibility = false">×</span>
      </div>
      <div class="listSection">
        <p class="listEmpty" v-if="cartProductLen == 0">尚未加入任何商品</p>
        <ul class="list" v-else>
          <li class="list__item" v-for="(item, index) in cartProductData.carts" :key="index">
            <div class="content">
              <div class="img" :style="{backgroundImage:`url(${item.product.imageUrl})`}"></div>
              <div class="product">
                <p class="name">{{item.product.title}}</p>
                <p class="unit">{{item.qty}}<span> / </span>{{item.product.unit}}</p>
              </div>
            </div>
            <div class="doing">
              <p>{{item.final_total | dollar}}</p>
              <span @click="delCartProduct(item.id)"> <i class="fas fa-spinner fa-spin"
                  v-if="item.id === effect.defLoading"></i>刪除</span>
            </div>
          </li>
        </ul>
      </div>

      <div class="goCart">
        <p class="total">總共：<span>{{cartProductData.final_total | dollar}}</span></p>
        <router-link class="btn" :class="{'btn--disabled':cartProductLen == 0}" to="/Checkout">查看並結帳</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['updateActive'],
    data() {
      return {
        // 是否打開購物車列表
        cartVisibility: false,
        // 購物車列表資料
        cartProductData: [],
        // 購物車品項數量
        cartProductLen: 0,
        // Loading效果觸發
        effect: {
          defLoading: '',
        }
      }
    },
    methods: {
      updateCart() {
        const vm = this;
        const url = `${process.env.API_Server}/api/${process.env.API_Path}/cart`;
        vm.$http.get(url).then((response) => {
          vm.cartProductData = response.data.data;
          vm.cartProductLen = vm.cartProductData.carts.length;
        })
      },
      delCartProduct(id) {
        const vm = this;
        const url = `${process.env.API_Server}/api/${process.env.API_Path}/cart/${id}`;
        vm.effect.defLoading = id;
        vm.$http.delete(url).then((response) => {
          vm.updateCart();
          vm.effect.defLoading = '';
        })
      },
    },
    watch: {
      updateActive() {
        this.updateCart();
      }
    },
    created() {
      this.updateCart();
    }
  }

</script>
