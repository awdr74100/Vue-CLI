<template>
  <div>
    <div class="userProductDetail">
      <!-- addToCart模板 -->
      <AddToCart :updateActive="updateCart" />
      <div class="wrap">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <div class="title">
                <span><i class="fas fa-cat"></i></span>
                <h3>產品介紹</h3>
              </div>
            </div>
          </div>
          <div class="row">
              <div class="col-12">
                  
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import AddToCart from './AddToCart';
  export default {
    components: {
      AddToCart,
    },
    data() {
      return {
        // 觸發購物車更新,
        updateCart: '',
      }
    },
    created() {
      const vm = this;
      console.log(vm.$route.params.id);
    },
  }

</script>
