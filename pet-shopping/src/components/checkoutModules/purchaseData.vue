<template>
  <div class="purchaseData">
    <div class="name">
      <i class="far fa-edit"></i>
      <h3>填寫訂購資料</h3>
    </div>
    <div class="order">
      <form action="#" class="form" @submit.prevent="createOrder">
        <div class="userData">
          <h3 class="sectionTitle">收件人資訊</h3>
          <label for="name">姓名*</label>
          <div class="userRow" :class="{'error':errors.has('name')}">
            <div class="icon"><i class="fas fa-user"></i></div>
            <input type="text" name="name" id="name" v-model="userData.user.name" v-validate="'required'">
          </div>
          <span class="errorMsg" v-if="errors.has('name')">姓名 必須輸入</span>
          <label for="tel">連絡電話*</label>
          <div class="userRow" :class="{'error':errors.has('tel')}">
            <div class="icon"><i class="fas fa-phone"></i></div>
            <input type="tel" name="tel" id="tel" v-model="userData.user.tel" v-validate="'required|digits:10'">
          </div>
          <span class="errorMsg" v-if="errors.has('tel')">{{errors.first('tel').replace(/tel/,'電話')}}</span>
          <label for="email">電子郵件*</label>
          <div class="userRow" :class="{'error':errors.has('email')}">
            <div class="icon"><i class="fas fa-envelope"></i></div>
            <input type="email" name="email" id="email" v-model="userData.user.email" v-validate="'required|email'">
          </div>
          <span class="errorMsg" v-if="errors.has('email')">{{errors.first('email')}}</span>
          <label for="address">收件地址*</label>
          <div class="userRow" :class="{'error':errors.has('address')}">
            <div class="icon"><i class="fas fa-map-marker-alt"></i></div>
            <input type="text" name="address" id="address" v-model="userData.user.address" v-validate="'required'">
          </div>
          <span class="errorMsg" v-if="errors.has('address')">地址 必須輸入</span>

          <label for="remarks">備註 (選填)</label>
          <textarea name="remarks" id="remarks" cols="30" rows="6" v-model="userData.message"></textarea>
        </div>
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
          <button class="btn btn--prev" @click.prevent="callprevStep"><i class="fas fa-arrow-left"></i>回上一步</button>
          <button class="btn btn--next">建立訂單並確認付款
            <i class="fas fa-arrow-right" v-if="!effect.createOrder"></i>
            <i class="fas fa-spinner fa-spin" v-else></i></button>
        </div>
      </form>
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
        },
        effect: {
          createOrder: false,
        }

      }
    },
    methods: {
      callprevStep() {
        this.$emit('prevStep');
      },
      createOrder() {
        const vm = this;
        const url = `${process.env.API_Server}/api/${process.env.API_Path}/order`;
        vm.effect.createOrder = true;
        this.$validator.validate().then(valid => {
          if (valid) {
            vm.$http.post(url, {
              data: vm.userData
            }).then((response) => {
              let orderId = response.data.orderId;
              if (response.data.success) {
                vm.$bus.$emit('message:push', response.data.message, 'success');
                vm.$emit('updateCart', orderId);
              } else {
                vm.$bus.$emit('message:push', response.data.message, 'danger');
              }
              vm.effect.createOrder = false;
            })
          } else {
            vm.$bus.$emit('message:push', '資料填寫錯誤，請再檢查一次', 'danger');
            vm.effect.createOrder = false;
          }
        });
      }
    },
  }

</script>
