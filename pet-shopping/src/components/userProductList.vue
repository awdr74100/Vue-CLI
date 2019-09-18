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
          <ul class="row productList">
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
              <div class="productList__item">
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
          <div class="row">
            <div class="col-12 mb-40">
              <!-- Pagination模板 -->
              <adminPagination :paginationData="pagination" @updatePagination="getThisProductList"
                v-if="pagination.current_page !== 0">
              </adminPagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import adminPagination from './adminPagination';
  export default {
    components: {
      adminPagination,
    },
    data() {
      return {
        sortMode: '商品排序',
        // 全部商品
        products: [],
        // 指定種類商品
        thisProducts: [],
        // Pagination物件
        pagination: {},

      }
    },
    methods: {
      // 取得商品列表
      getProductList() {
        const url = `${process.env.API_Server}/api/${process.env.API_Path}/products/all`;
        const vm = this;
        vm.$http.get(url).then((response) => {
          vm.products = response.data.products;
          vm.getThisProductList();
        })
      },
      // 取得指定種類商品列表
      getThisProductList(page = 1) {
        const vm = this;
        let listType = vm.$route.params.id;
        if (listType === '全部商品') {
          vm.thisProducts = vm.products.filter(item => item.is_enabled == 1);
        } else {
          vm.thisProducts = vm.products.filter(item => item.category === listType && item.is_enabled == 1);
        }
        console.log(vm.thisProducts);
        console.log(page);
        // let currentData = vm.thisProducts.slice(0, 9)
        vm.createPagination(page);
      },
      // 模擬API Pagination
      createPagination(page) {
        // console.log(page);
        const vm = this;
        let paginationData = {
          "total_pages": 1,
          "current_page": 1,
          "has_pre": true,
          "has_next": false,
          "category": null
        };
        paginationData.total_pages = Math.ceil(vm.thisProducts.length / 9);
        paginationData.current_page = page;
        if (paginationData.current_page < paginationData.total_pages) {
          paginationData.has_next = true;
        }
        if (paginationData.current_page == 1) {
          paginationData.has_pre = false;
        }
        // console.log(paginationData);
        vm.pagination = paginationData;
      }
    },
    // 監控$route.Id
    watch: {
      '$route': "getThisProductList",
    },
    computed: {
      filterProductData() {
        const vm = this;
        let pagination = {
          "total_pages": 1,
          "current_page": 1,
          "has_pre": false,
          "has_next": false,
          "category": null
        }


      }
    },
    created() {
      this.getProductList();
    },
  }

</script>
