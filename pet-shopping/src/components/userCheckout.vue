<template>
  <div>
    <loading :active.sync="effect.isLoading">
      <template slot="default">
        <div class="loading-pulse left-125"></div>
      </template>
    </loading>
    <div class="userCheckout">
      <div class="wrap">
        <header class="header">
          <span><i class="fas fa-cat"></i></span>
          <h3>訂單資訊</h3>
        </header>
        <section class="cartEmpty" v-if="cartProductLen === 0 ">
          <p v-if="this.$route.query.id">找不到訂單，請再檢查一次</p>
          <p v-else>尚未加入任何商品</p>
          <button @click="toShopping"><i class="fas fa-arrow-left"></i>繼續逛逛</button>
        </section>
        <div class="container" v-if="cartProductLen > 0">
          <div class="row">
            <div class="col-12">
              <checkoutStep :step="step" />
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <!-- 渲染購物車清單 -->
              <cartData :data="cartProductData" :dataLen="cartProductLen" @updateCart="getCartData" />
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <!-- 套用優惠卷 -->
              <applyCoupon v-if="step == 'checkCart' " @updateCart="getCartData" />
              <!-- 選擇運送方式 -->
              <deliveryMethods v-if="step == 'checkCart' " @nextStep="step = 'createOrder'" />
              <!-- 填寫訂購資料 -->
              <purchaseData v-if="step == 'createOrder' " @updateCart="showOrderDetial"
                @prevStep="step = 'checkCart'" />
              <!-- 付款/完成訂單 -->
              <orderDetail v-if="step == 'showOrderDetail' || step == 'completeOrder' " @updateCart="showOrderDetial"
                :userData="cartProductData" />
            </div>
          </div>
        </div>
      </div>
      <footer class="footer">
        <div class="link">
          <a href="https://reurl.cc/W4qG6k" target="_blank"><i class="fab fa-github"></i></a>
          <a href="https://reurl.cc/9zGRvv" target="_blank"><i class="fab fa-codepen"></i></a>
        </div>
        <p>資料、圖片來源皆來自網路，僅用來做為學習用途。</p>
      </footer>
    </div>
  </div>
</template>

<script>
  import checkoutStep from './checkoutModules/checkoutStep';
  import cartData from './checkoutModules/cartData';
  import applyCoupon from './checkoutModules/applyCoupon';
  import deliveryMethods from './checkoutModules/deliveryMethods';
  import purchaseData from './checkoutModules/purchaseData';
  import orderDetail from './checkoutModules/orderDetail';


  export default {
    components: {
      checkoutStep,
      cartData,
      applyCoupon,
      deliveryMethods,
      purchaseData,
      orderDetail,
    },
    data() {
      return {
        // 目前結帳階段
        step: 'checkCart',
        // 購物車商品資料
        cartProductData: [],
        // 購物車商品數量
        cartProductLen: 0,
        // Loading效果觸發
        effect: {
          isLoading: false,
        },
      }
    },
    methods: {
      // 獲取購物車列表
      getCartData() {
        const vm = this;
        const url = `${process.env.API_Server}/api/${process.env.API_Path}/cart`;
        vm.effect.isLoading = true;
        vm.$http.get(url).then((response) => {
          vm.cartProductData = response.data.data;
          vm.cartProductLen = vm.cartProductData.carts.length;
          vm.effect.isLoading = false;
        })
      },
      // 顯示指定訂單細節
      showOrderDetial(orderId) {
        const vm = this;
        const url = `${process.env.API_Server}/api/${process.env.API_Path}/order/${orderId}`;
        vm.effect.isLoading = true;
        vm.$http.get(url).then((response) => {
          if (response.data.order == null) {
            vm.$bus.$emit('message:push', '查詢訂單失敗，請再檢查一次', 'danger');
          } else {
            vm.cartProductData = response.data.order;
            vm.cartProductLen = Object.keys(response.data.order.products).length;
            if (response.data.order.is_paid == true) {
              vm.step = 'completeOrder';
            } else {
              vm.step = 'showOrderDetail';
            }
          }
          vm.effect.isLoading = false;
        })
      },
      // 回到商品列表
      toShopping() {
        this.$router.push({
          path: "/ProductList/全部商品",
        })
      }
    },
    // 時時監控查詢訂單動作
    watch: {
      '$route.query'() {
        this.showOrderDetial(this.$route.query.id);
      }
    },
    created() {
      const vm = this;
      // 判斷查詢訂單或者結帳
      if (vm.$route.query.id) {
        vm.showOrderDetial(vm.$route.query.id);
      } else {
        this.getCartData();
      }
    },
  }

</script>
