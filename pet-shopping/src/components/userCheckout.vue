<template>
  <div>
    <loading :active.sync="effect.isLoading">
      <template slot="default">
        <div class="loading-pulse left-125"></div>
      </template>
    </loading>
    <div class="userCheckout">
      <div class="wrap">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <div class="title">
                <span><i class="fas fa-cat"></i></span>
                <h3>購物車列表</h3>
              </div>
            </div>
          </div>
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
          console.log(response.data);
          vm.cartProductData = response.data.order;
          vm.cartProductLen = Object.keys(response.data.order.products).length;
          if (response.data.order.is_paid == true) {
            vm.step = 'completeOrder';
          } else {
            vm.step = 'showOrderDetail';
          }
          vm.effect.isLoading = false;
        })
      }
    },
    created() {
      this.getCartData();
    },
  }

</script>
