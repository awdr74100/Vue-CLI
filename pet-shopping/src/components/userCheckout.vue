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
              <CheckoutStep />
            </div>
          </div>
          <div class="row">
            <div class="col-12 table-center">
              <div class="cartData" :class="{'cartData--open':cartVisibility}">
                <p class="cartData__title" @click="cartVisibility = !cartVisibility">購物車清單<i
                    class="fas fa-caret-down"></i></p>
                <div class="cartData__container">
                  <table>
                    <thead>
                      <tr>
                        <th class="t-s">操作</th>
                        <th class="t-m">產品圖片</th>
                        <th class="t-xl">產品名稱</th>
                        <th class="t-m">數量</th>
                        <th class="t-m">小計</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in cartProductData.carts" :key="index">
                        <td class="t-s">
                          <span class="delete"><i class="fas fa-spinner fa-spin"
                              v-if="effect.delProduct == item.id"></i><i class="far fa-trash-alt"
                              @click="delCartProduct(item.id)" v-else></i></span>
                        </td>
                        <td class="t-m">
                          <div class="img" :style="{backgroundImage:`url(${item.product.imageUrl})`}"></div>
                        </td>
                        <td class="t-xl">
                          <div class="name">
                            <p>{{item.product.title}}</p>
                          </div>
                        </td>
                        <td class="t-m">
                          <p class="count">{{item.qty}}<span> / {{item.product.unit}}</span></p>
                        </td>
                        <td class="t-m">
                          <p class="total">{{item.final_total | dollar}}</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="content">
                    <p class="count">共計<span>{{cartProductLen}}</span>項商品</p>
                    <p class="price">+ 運費<span>NT$0</span>總計：<span
                        class="totalPrice">{{cartProductData.final_total | dollar}}</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <div class="couponSection">
                <div class="coupon-container">
                  <p class="message">✦ 慶祝開幕，輸入折扣碼「sdf9fwef7」，即享有全館商品9折優惠</p>
                  <div class="coupon">
                    <input type="text" class="coupon__input" placeholder="請輸入優惠代碼">
                    <button class="coupon__btn">套用優惠碼</button>
                  </div>
                </div>
              </div>
              <div class="transport">
                <div class="name">
                  <i class="fas fa-exclamation-circle"></i>
                  <h3>請選擇物流方式</h3>
                </div>
                <ul class="list">
                  <li class="list__item">
                    <input type="radio" name="sport" id="a1">
                    <label for="a1" class="method">
                      <p>超商取貨付款 (7-11) NT$0</p>
                      <span>7-11取貨付款，收取50元物流費。若單筆購物滿100元，即享有免運費優惠</span>
                    </label>
                  </li>
                  <li class="list__item">
                    <input type="radio" name="sport" id="a2">
                    <label for="a2" class="method">
                      <p>超商取貨付款 (其他) NT$0</p>
                      <span>全家、OK、萊爾富取貨付款，收取50元物流費。若單筆購物滿100元，即享有免運費優惠</span>
                    </label>
                  </li>
                </ul>
                <button>下一步<i class="fas fa-arrow-right"></i></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import CheckoutStep from './CheckoutStep';
  export default {
    components: {
      CheckoutStep,
    },
    data() {
      return {
        // 購物車商品資料
        cartProductData: [],
        // 購物車商品數量
        cartProductLen: 0,
        // Loading效果觸發
        effect: {
          isLoading: false,
          applyCoupon: false,
          delProduct: '',
        },
        // 購物車是否打開
        cartVisibility: true,
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
      // 刪除購物車商品
      delCartProduct(id) {
        const vm = this;
        const url = `${process.env.API_Server}/api/${process.env.API_Path}/cart/${id}`;
        vm.effect.delProduct = id;
        vm.$http.delete(url).then((response) => {
          vm.$bus.$emit('message:push', '已刪除項目', 'success');
          vm.getCartData();
          vm.effect.delProduct = '';
        })
      },
    },
    created() {
      this.getCartData();
    },
  }

</script>
