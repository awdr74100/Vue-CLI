<template>
  <div class="deliveryMethods">
    <div class="name">
      <i class="fas fa-exclamation-circle"></i>
      <h3>確認配送方式</h3>
    </div>
    <ul class="list">
      <li class="list__item">
        <input type="radio" name="sport" id="a1" checked>
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
    <button @click.prevent="callnextStep">下一步，填寫訂購資料<i class="fas fa-arrow-right"></i></button>
  </div>
</template>

<script>
  export default {
    methods: {
      callnextStep() {
        this.$emit('nextStep');
      }
    },
  }

</script>
