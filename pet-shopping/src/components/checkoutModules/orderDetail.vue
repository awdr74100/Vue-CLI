<template>
  <div class="orderDetail">
    <div class="name">
      <i class="fas fa-comment-dollar"></i>
      <h3>確認訂單並付款</h3>
    </div>
    <div class="checkOrder">
      <div class="userData">
        <h3 class="sectionTitle">收件人資訊</h3>
        <p class="userData__title">姓名</p>
        <div class="userData__row">
          <div class="icon"><i class="fas fa-user"></i></div>
          <span class="userData__content">{{userData.user.name}}</span>
        </div>
        <p class="userData__title">連絡電話</p>
        <div class="userData__row">
          <div class="icon"><i class="fas fa-phone"></i></div>
          <span class="userData__content">{{userData.user.tel}}</span>
        </div>
        <p class="userData__title">電子郵件</p>
        <div class="userData__row">
          <div class="icon"><i class="fas fa-envelope"></i></div>
          <span class="userData__content">{{userData.user.email}}</span>
        </div>
        <p class="userData__title">收件地址</p>
        <div class="userData__row">
          <div class="icon"><i class="fas fa-map-marker-alt"></i></div>
          <span class="userData__content">{{userData.user.address}}</span>
        </div>
        <p class="userData__title">備註</p>
        <div class="userData__row">
          <span class="userData__remark">{{userData.message}}</span>
        </div>
      </div>
      <div class="orderData">
        <h3 class="sectionTitle">訂單資訊</h3>
        <ul class="list">
          <li class="list__item">
            <i>建立時間：</i>
            <p>{{userData.create_at | dateTime}}</p>
          </li>
          <li class="list__item">
            <i>訂單編號：</i>
            <p>{{userData.id}}</p>
          </li>
          <li class="list__item">
            <i>付款狀態：</i>
            <p class="pay pay--isPay" v-if="userData.is_paid">已完成付款</p>
            <p class="pay" v-else>尚未付款</p>
          </li>
        </ul>
        <button class="btn btn--pay" @click="confirmPay(userData.id)" v-if="!userData.is_paid">確認並付款<i
            class="fas fa-spinner fa-spin" v-if="effect.orderPay"></i></button>
        <button class="btn btn--reset" @click="toShopping" v-else>繼續逛逛<i class="fas fa-arrow-right"></i></button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['userData'],
    data() {
      return {
        effect: {
          orderPay: false,
        }
      }
    },
    methods: {
      confirmPay(orderId) {
        const vm = this;
        const url = `${process.env.API_Server}/api/${process.env.API_Path}/pay/${orderId}`;
        vm.effect.orderPay = true;
        vm.$http.post(url).then((response) => {
          vm.$bus.$emit('message:push', response.data.message, 'success');
          vm.$emit('updateCart', orderId);
          vm.effect.orderPay = false;
        })
      },
      toShopping() {
        this.$router.push({
          path: "/ProductList/全部商品",
        })
      }
    },
  }

</script>
