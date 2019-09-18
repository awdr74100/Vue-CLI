<template>
  <div>
    <div class="userProductList">
      <div class="wrap">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <div class="title">
                <span><i class="fas fa-cat"></i></span>
                <h3>商品列表</h3>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12 justify-content-flex-end">
              <div class="sort">
                <div class="thisSort">
                  <span>{{sortMode}}</span>
                  <i class="fas fa-chevron-down"></i>
                </div>
                <ul>
                  <li @click="sortMode = '商品排序' ">商品排序</li>
                  <li @click="sortMode = '價格：由高至低' ">價格：由高至低</li>
                  <li @click="sortMode = '價格：由低至高' ">價格：由低至高</li>
                </ul>
              </div>
            </div>
          </div>
          <ul class="row list">
            <!-- <li class="col-4">
              <div class="list__item">
                <div class="img"></div>
                <div class="detail">
                  <button class="detail__view">VIEW DETAIL</button>
                </div>
                <div class="content">
                  <h4>原野優越Earthborn《室內貓(雞肉+鮭魚+蔓越莓)》5磅</h4>
                  <p class="group"><i class="fas fa-tag"></i>貓咪飼料</p>
                  <div class="price">
                    <span class="o-price">NT$1680</span>
                    <span class="discount">NT$1480</span>
                  </div>
                  <button class="addCart">加入購物車</button>
                </div>
              </div>
            </li> -->
            <!-- test -->
            <li class="col-4" v-for="(item, index) in thisProducts" :key="index">
              <div class="list__item">
                <div class="img" :style="{backgroundImage:`url(${item.imageUrl})`}"></div>
                <div class="detail">
                  <button class="detail__view">VIEW DETAIL</button>
                </div>
                <div class="content">
                  <h4>{{item.title}}</h4>
                  <p class="group"><i class="fas fa-tag"></i>{{item.category}}</p>
                  <div class="price">
                    <span class="o-price"
                      :class="{'o-price--active':item.origin_price == item.price}">{{item.origin_price | dollar}}</span>
                    <span class="discount" v-if="item.origin_price !== item.price">{{item.price | dollar}}</span>
                  </div>
                  <button class="addCart">加入購物車</button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        sortMode: '商品排序',
        // 全部商品
        products: [],
        // 指定種類商品
        thisProducts: [],

      }
    },
    methods: {
      // 取得商品列表
      getProductList() {
        const url = `${process.env.API_Server}/api/${process.env.API_Path}/products/all`;
        const vm = this;
        vm.$http.get(url).then((response) => {
          vm.products = response.data.products;
          console.log(vm.products);
          vm.getThisProductList();
        })
      },
      // 取得指定種類商品列表
      getThisProductList() {
        const vm = this;
        let listType = vm.$route.params.id;
        if (listType === '全部商品') {
          vm.thisProducts = vm.products.filter(item => item.is_enabled == 1);
        } else {
          vm.thisProducts = vm.products.filter(item => item.category === listType && item.is_enabled == 1);
        }
        console.log(vm.thisProducts);
      }
    },
    // 監控$route.Id
    watch: {
      '$route': "getThisProductList",
    },
    computed: {
      filterProductData() {
        const vm = this;

      }
    },
    created() {
      this.getProductList();
    },
  }

</script>
