<template>
  <div class="cartData" :class="{'cartData--open':cartVisibility}">
    <p class="cartData__title" @click="cartVisibility = !cartVisibility">購物車清單<i class="fas fa-caret-down"></i></p>
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
              <span class="delete"><i class="fas fa-spinner fa-spin" v-if="effect.delProduct == item.id"></i><i
                  class="far fa-trash-alt" @click="delCartProduct(item.id)" v-else></i></span>
            </td>
            <td class="t-m">
              <div class="img" :style="{backgroundImage:`url(${item.product.imageUrl})`}"></div>
            </td>
            <td class="t-xl">
              <div class="name">
                <p>{{item.product.title}}</p>
                <p class="applyCoupon" v-if="item.coupon"><span>{{item.coupon.percent}} %</span></p>
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
</template>

<script>
  export default {
    props: ['cartProductData'],
    data() {
      return {
        // 購物車是否打開
        cartVisibility: true,
      }
    },
    methods: {

    },
  }

</script>
