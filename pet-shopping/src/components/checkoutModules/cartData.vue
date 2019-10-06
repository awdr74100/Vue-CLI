<template>
  <div class="cartData" :class="{'cartData--open':cartVisibility}">
    <p class="cartData__title" @click="cartVisibility = !cartVisibility">購物車清單<i class="fas fa-caret-down"
        :class="{'active':cartVisibility == true}"></i></p>
    <div class="cartData__container">
      <table>
        <thead>
          <tr>
            <th class="t-s" v-if="data.carts">操作</th>
            <th class="t-m">產品圖片</th>
            <th class="t-xl">產品名稱</th>
            <th class="t-m">數量</th>
            <th class="t-m">小計</th>
          </tr>
        </thead>
        <!-- 確認購買清單 -->
        <tbody v-if="data.carts">
          <tr v-for="(item, index) in data.carts" :key="index">
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
                <p class="discount" v-if="item.coupon"><span>- {{ 100 - item.coupon.percent}} %</span></p>
              </div>
            </td>
            <td class="t-m">
              <p class="count">{{item.qty}}<span> / {{item.product.unit}}</span></p>
            </td>
            <td class="t-m">
              <div class="total">
                <p class="o-price" v-if="item.total !== item.final_total"
                  :class="{' o-price--delete':item.total !== item.final_total}">{{item.total | dollar}}</p>
                <p class="final-price">{{item.final_total | dollar}}</p>
              </div>
            </td>
          </tr>
        </tbody>
        <!-- 付款/完成訂單 -->
        <tbody v-else>
          <tr v-for="(item, index) in data.products" :key="index">
            <td class="t-m">
              <div class="img" :style="{backgroundImage:`url(${item.product.imageUrl})`}"></div>
            </td>
            <td class="t-xl">
              <div class="name">
                <p>{{item.product.title}}</p>
                <p class="discount" v-if="item.coupon"><span>- {{ 100 - item.coupon.percent}} %</span></p>
              </div>
            </td>
            <td class="t-m">
              <p class="count">{{item.qty}}<span> / {{item.product.unit}}</span></p>
            </td>
            <td class="t-m">
              <div class="total">
                <p class="o-price" v-if="item.total !== item.final_total"
                  :class="{' o-price--delete':item.total !== item.final_total}">{{item.total | dollar}}</p>
                <p class="final-price">{{item.final_total | dollar}}</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="content" v-if="data.carts">
        <p class="count">共計<span>{{dataLen}}</span>項商品</p>
        <p class="price">+ 運費<span>NT$0</span>總金額：<span class="totalPrice"
            :class="{'totalPrice--disabled':data.total !== data.final_total}">{{data.total | dollar}}</span></p>
        <p class="price" v-if="data.total !== data.final_total">優惠價：<span
            class="totalPrice">{{data.final_total | dollar}}</span></p>
      </div>
      <div class="content" v-else>
        <p class="count">共計<span>{{dataLen}}</span>項商品</p>
        <p class="price">總金額：<span class="totalPrice">{{data.total | dollar}}</span></p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['data', 'dataLen'],
    data() {
      return {
        // 購物車是否打開
        cartVisibility: true,
        // Loading效果觸發
        effect: {
          delProduct: '',
        },
      }
    },
    methods: {
      // 刪除購物車商品
      delCartProduct(id) {
        const vm = this;
        const url = `${process.env.API_Server}/api/${process.env.API_Path}/cart/${id}`;
        vm.effect.delProduct = id;
        vm.$http.delete(url).then((response) => {
          vm.$bus.$emit('message:push', '已刪除項目', 'success');
          //   vm.getCartData();
          vm.effect.delProduct = '';
          vm.$emit('updateCart')
        })
      },
    },
  }

</script>
