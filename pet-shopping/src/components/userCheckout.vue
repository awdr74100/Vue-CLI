<template>
  <div>
    <div class="userCheckout">
      <div class="wrap">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <div class="title">
                <span><i class="fas fa-cat"></i></span>
                <h3>購物車清單</h3>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <CheckoutStep />
            </div>
          </div>
          <div class="row">
            <router-view></router-view>
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
    }
  }

</script>
