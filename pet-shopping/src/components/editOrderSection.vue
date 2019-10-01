<template>
  <div class="editOrderSection">
    <div class="name">
      <i class="far fa-edit"></i>
      <h3>填寫訂購資料</h3>
    </div>
    <div class="order">
      <form action="#" class="form">
        <h3 class="sectionTitle">收件人資訊</h3>
        <label for="name">姓名</label>
        <div class="userRow">
          <div class="icon"><i class="fas fa-user"></i></div>
          <input type="text" name="name" id="name" v-model="userData.user.name">
        </div>
        <label for="phone">連絡電話</label>
        <div class="userRow">
          <div class="icon"><i class="fas fa-phone"></i></div>
          <input type="tel" name="phone" id="phone" v-model="userData.user.tel">
        </div>
        <label for="mail">電子郵件</label>
        <div class="userRow">
          <div class="icon"><i class="fas fa-envelope"></i></div>
          <input type="email" name="mail" id="mail" v-model="userData.user.email">
        </div>
        <label for="address">收件地址</label>
        <div class="userRow">
          <div class="icon"><i class="fas fa-map-marker-alt"></i></div>
          <input type="text" name="address" id="address" v-model="userData.user.address">
        </div>
        <label for="remarks">備註</label>
        <textarea name="remarks" id="remarks" cols="30" rows="7" v-model="userData.message"></textarea>
      </form>
      <div class="pay">
        <h3 class="sectionTitle">付款方式</h3>
        <ul class="list">
          <li class="list__item">
            <input type="radio" name="pay" id="atm" disabled>
            <label for="atm"><i class="far fa-credit-card"></i>網路ATM / ATM 櫃員機 (暫不開放)</label>
          </li>
          <li class="list__item">
            <input type="radio" name="pay" id="card" disabled>
            <label for="card"><i class="fab fa-cc-visa"></i>信用卡 (暫不開放))</label>
          </li>
          <li class="list__item">
            <input type="radio" name="pay" id="test" checked>
            <label for="test"><i class="fas fa-cubes"></i>模擬付款</label>
          </li>
        </ul>
      </div>
      <div class="btn-group">
        <button class="btn btn--prev" @click="callprevStep"><i class="fas fa-arrow-left"></i>回上一步</button>
        <button class="btn btn--next" @click="createOrder">建立訂單並確認付款<i class="fas fa-arrow-right"></i></button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        userData: {
          user: {
            name: '',
            email: '',
            tel: '',
            address: '',
          },
          message: '',
        }
      }
    },
    methods: {
      callprevStep() {
        this.$emit('prevStep');
      },
      callnextStep() {
        this.$emit('event');
      },
      createOrder() {
        const vm = this;
        const url = `${process.env.API_Server}/api/${process.env.API_Path}/order`;
        vm.$http.post(url, {
          data: vm.userData
        }).then((response) => {
          console.log(response.data);
          console.log(response.data.orderId);
          let orderId = response.data.orderId;
          if (response.data.success) {
            vm.$bus.$emit('message:push', response.data.message, 'success');
            vm.$emit('updateCart',orderId);
          } else {
            vm.$bus.$emit('message:push', response.data.message, 'danger');
          }
        })
      }
    },
  }

</script>
