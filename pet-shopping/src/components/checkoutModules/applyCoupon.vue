<template>
  <div class="applyCoupon">
    <div class="coupon-container">
      <p class="message">✦ 慶祝開幕，輸入折扣碼「sdf9fwef7」，即享有全館商品9折優惠</p>
      <div class="coupon">
        <input type="text" class="coupon__input" placeholder="請輸入優惠代碼" v-model="couponCode">
        <button class="coupon__btn" @click="applyCoupon"><i class="fas fa-spinner fa-spin"
            v-if="effect.applyCoupon"></i>套用優惠碼</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        // 優惠代碼
        couponCode: '',
        // loading效果觸發
        effect: {
          applyCoupon: false,
        }
      }
    },
    methods: {
      // 套用優惠碼
      applyCoupon() {
        const vm = this;
        const url = `${process.env.API_Server}/api/${process.env.API_Path}/coupon`;
        let coupon = {
          "code": vm.couponCode,
        }
        vm.effect.applyCoupon = true;
        vm.$http.post(url, {
          data: coupon
        }).then((response) => {
          if (response.data.success === true) {
            vm.couponCode = '';
            vm.$bus.$emit('message:push', response.data.message, 'success');
            vm.$emit('updateCart');
          } else {
            vm.couponCode = '';
            vm.$bus.$emit('message:push', response.data.message, 'danger');
          }
          vm.effect.applyCoupon = false;
        })
      },
    },
  }

</script>
