<template>
  <div>
    <loading :active.sync="effect.isLoading">
      <template slot="default">
        <div class="loading-pulse left-125"></div>
      </template>
    </loading>
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
                <p class="goBack" @click="goBackList"><i class="fas fa-reply"></i>返回列表</p>
              </div>
            </div>
            <div class="col-6">
              <div class="rightContent">
                <h2>{{productDetailData.title}}</h2>
                <div class="tag"><i class="fas fa-tag"></i>{{productDetailData.category}}</div>
                <div class="message"><i class="fas fa-bullhorn"></i>全店，本島宅配滿二千免運</div>
                <div class="explain">
                  <span class="name">【商品特色】</span>
                  <p v-html="description"></p>
                </div>
                <p class="price">
                  {{productDetailData.price | dollar}}<span>{{productDetailData.origin_price | dollar}}</span></p>
                <div class="num">
                  <button class="btn" :class="{'btn--cancel':productNum <= 1}" @click="productNum = productNum - 1"><i
                      class="fas fa-minus"></i></button>
                  <input type="number" name="" id="" min="0" max="999" v-model.number="productNum">
                  <button class="btn" @click="productNum = productNum + 1"><i class="fas fa-plus"></i></button>
                  <p>小計：{{productDetailData.price * productNum}}</p>
                </div>
                <div class="addSection">
                  <button class="addCart" @click="doingMode('add')"><i class="fas fa-spinner fa-spin"
                      v-if="effect.doing == 'add'"></i><i class="fas fa-cart-plus"></i>加入購物車</button>
                  <button class="checkout" @click="doingMode('checkout')"><i class="fas fa-spinner fa-spin"
                      v-if="effect.doing == 'checkout'"></i><i class="fas fa-cart-arrow-down"></i>直接購買</button>
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-30">
            <div class="col-12">
              <div class="productData">
                <h3>商品介紹</h3>
                <p>{{productDetailData.content}}</p>
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
        // Loading效果觸發
        effect: {
          isLoading: false,
          doing: '',
        },
        // 指定商品資料
        productDetailData: [],
        // 購買產品數量
        productNum: 1,
        // 字串轉成列表 - description
        description: '',
      }
    },
    methods: {
      // 獲取產品細節
      getProductDetailData() {
        const vm = this;
        let productId = vm.$route.params.id
        const url = `${process.env.API_Server}/api/${process.env.API_Path}/product/${productId}`;
        vm.effect.isLoading = true;
        vm.$http.get(url).then((response) => {
          vm.productDetailData = response.data.product;
          vm.toDescription();
          vm.effect.isLoading = false;
        })
      },
      // 判斷購物車產品增加或結帳
      doingMode(name) {
        const vm = this;
        const url = `${process.env.API_Server}/api/${process.env.API_Path}/cart`;
        if (vm.productNum == '') {
          return
        };
        let product = {
          'product_id': vm.productDetailData.id,
          'qty': vm.productNum,
        }
        vm.effect.doing = name;
        vm.$http.post(url, {
          data: product
        }).then((response) => {
          // 隨機變數觸發更新購物車列表
          vm.updateCart = Date.now();
          vm.$bus.$emit('message:push', response.data.message, 'success');
          vm.effect.doing = '';
        })
      },
      // 將商品細節轉為HTML格式
      toDescription() {
        const vm = this;
        let str = vm.productDetailData.description;
        let toBreak = str.replace(/\；/g, "<span class='br'></span>");
        let toList = toBreak.replace(/\*/g, '◆　');
        vm.description = toList;
      },
      // 返回商品列表
      goBackList() {
        this.$router.go(-1);
      }
    },
    created() {
      const vm = this;
      vm.getProductDetailData();
    },
  }

</script>
