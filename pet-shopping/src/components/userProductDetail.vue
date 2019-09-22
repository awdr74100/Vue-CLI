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
          <div class="row mt-50 pb-500">
            <div class="col-6">
              <div class="leftImg">
                <div class="img"><span :style="{backgroundImage:`url(${productDetailData.imageUrl})`}"></span></div>
              </div>
            </div>
            <div class="col-6">
              <div class="rightContent">
                <h2>{{productDetailData.title}}</h2>
                <div class="tag"><i class="fas fa-tag"></i>{{productDetailData.category}}</div>
                <div class="message"><i class="fas fa-bullhorn"></i>全店，本島宅配滿二千免運</div>
                <div class="explain">
                  <span class="name">【商品特色】</span>
                  <p>適合成年時體重超過25公斤、已斷奶、18-24個月大的幼犬；不適合懷孕或哺乳中的狗狗</p>
                </div>
                <p class="price">
                  {{productDetailData.price | dollar}}<span>{{productDetailData.origin_price | dollar}}</span></p>
                <div class="num">
                  <select v-model="productNun">
                    <option disabled value="">請選擇數量</option>
                    <option :value="item" v-for="(item, index) in 10" :key="index">選購{{item}}包</option>
                  </select>
                  <p>小計：{{productDetailData.price * productNun}}</p>
                </div>
                <div class="addSection">
                  <button class="addCart" @click="doingMode('add')"><i class="fas fa-spinner fa-spin"
                      v-if="doing == 'add'"></i><i class="fas fa-cart-plus"></i>加入購物車</button>
                  <button class="checkout" @click="doingMode('checkout')"><i class="fas fa-spinner fa-spin"
                      v-if="doing == 'checkout'"></i><i class="fas fa-cart-arrow-down"></i>直接購買</button>
                </div>
              </div>
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
        // 判斷產品動作
        doing: '',
        // 指定商品資料
        productDetailData: [],
        // 購買產品數量
        productNun: '',

      }
    },
    methods: {
      // 獲取產品細節
      getProductDetailData() {
        const vm = this;
        let productId = vm.$route.params.id
        const url = `${process.env.API_Server}/api/${process.env.API_Path}/product/${productId}`;
        vm.$http.get(url).then((response) => {
          vm.productDetailData = response.data.product;
        })
      },
      // 判斷購物車產品增加或結帳
      doingMode(name) {
        const vm = this;
        const url = `${process.env.API_Server}/api/${process.env.API_Path}/cart`;
        if (vm.productNun == '') {
          return
        };
        let product = {
          'product_id': vm.productDetailData.id,
          'qty': vm.productNun,
        }
        vm.doing = name;
        vm.$http.post(url, {
          data: product
        }).then((response) => {
          // 隨機變數觸發更新購物車列表
          vm.updateCart = Date.now();
          vm.$bus.$emit('message:push', response.data.message, 'success');
          vm.doing = '';
        })
      },
    },
    created() {
      const vm = this;
      vm.getProductDetailData();
    },
  }

</script>
