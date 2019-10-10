<template>
  <div>
    <loading :active.sync="effect.isLoading">
      <template slot="default">
        <div class="loading-pulse left-125"></div>
      </template>
    </loading>
    <div class="userProductList">
      <!-- ShoppingCart模板 -->
      <ShoppingCart :updateActive="updateCart" />
      <div class="wrap">
        <header class="header">
          <span><i class="fas fa-cube"></i></span>
          <h3>商品列表</h3>
        </header>
        <div class="container">
          <div class="row">
            <div class="col-12 justify-content-flex-end">
              <div class="sort">
                <div class="thisSort">
                  <span>{{sortMode}}</span>
                  <i class="fas fa-chevron-down"></i>
                </div>
                <ul>
                  <li @click="getThisProductList('default')">商品排序</li>
                  <li @click="getThisProductList('price-toLow')">價格：由高至低</li>
                  <li @click="getThisProductList('price-toHigh')">價格：由低至高</li>
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
            <li class="col-4" v-for="(item, index) in toggleProducts" :key="index">
              <div class="productList__item">
                <div class="img" :style="{backgroundImage:`url(${item.imageUrl})`}"></div>
                <div class="detail">
                  <button class="detail__view" @click.prevent="toProductDetail(item.id)">VIEW DETAIL</button>
                </div>
                <div class="content">
                  <h4>{{item.title}}</h4>
                  <p class="group"><i class="fas fa-tag"></i>{{item.category}}</p>
                  <div class="price">
                    <span class="o-price"
                      :class="{'o-price--active':item.origin_price == item.price}">{{item.origin_price | dollar}}</span>
                    <span class="discount" v-if="item.origin_price !== item.price">{{item.price | dollar}}</span>
                  </div>
                  <button :disabled="effect.addLoading !== '' " class="addCart"
                    @click.prevent="addProductToCart(item.id,item.qty)"><span v-if="item.id === effect.addLoading"><i
                        class="fas fa-spinner fa-spin"></i></span>加入購物車</button>
                </div>
              </div>
            </li>
          </ul>
          <div class="row">
            <div class="col-12 pb-15">
              <!-- Pagination模板 -->
              <Pagination :paginationData="pagination" @updatePagination="getToggleProductList"
                v-if="pagination.current_page !== 0">
              </Pagination>
            </div>
          </div>
        </div>
      </div>
      <footer class="footer">
        <div class="link">
          <a href="https://reurl.cc/W4qG6k" target="_blank"><i class="fab fa-github"></i></a>
          <a href="https://reurl.cc/9zGRvv" target="_blank"><i class="fab fa-codepen"></i></a>
        </div>
        <p>資料、圖片來源皆來自網路，僅用來做為學習用途。</p>
      </footer>
    </div>
  </div>
</template>

<script>
  import Pagination from './pageModules/Pagination';
  import ShoppingCart from './pageModules/ShoppingCart';
  export default {
    components: {
      Pagination,
      ShoppingCart,
    },
    data() {
      return {
        sortMode: '商品排序',
        // 全部商品
        products: [],
        // 指定種類商品
        classProducts: [],
        // 切換頁面顯示的商品
        toggleProducts: [],
        // Loading效果觸發
        effect: {
          isLoading: false,
          addLoading: '',
        },
        // Pagination物件
        pagination: {},
        // 觸發購物車更新,
        updateCart: '',
      }
    },
    methods: {
      // 取得全部商品列表
      getProductList() {
        const url = `${process.env.API_Server}/api/${process.env.API_Path}/products/all`;
        const vm = this;
        vm.effect.isLoading = true;
        vm.$http.get(url).then((response) => {
          vm.products = response.data.products;
          vm.effect.isLoading = false;
          vm.getThisProductList();
        })
      },
      // 取得指定種類商品列表
      getThisProductList(mode = 'default') {
        const vm = this;
        let listType = vm.$route.params.class;
        // 過濾下架產品與不同種類產品
        if (listType === '全部商品') {
          vm.classProducts = vm.products.filter(item => item.is_enabled == 1);
        } else {
          vm.classProducts = vm.products.filter(item => item.category === listType && item.is_enabled == 1);
        };
        if (mode == 'default') {
          vm.sortMode = '商品排序';
        } else if (mode == 'price-toLow') {
          vm.sortMode = '價格：由高至低';
          vm.classProducts = vm.classProducts.sort((a, b) => b.price - a.price);
        } else {
          vm.sortMode = '價格：由低至高'
          vm.classProducts = vm.classProducts.sort((a, b) => a.price - b.price);
        };
        vm.getToggleProductList();
      },
      // 取得切換頁面商品列表
      getToggleProductList(page = 1) {
        const vm = this;
        let startItem = (page - 1) * 9;
        let endItem = page * 9;
        vm.toggleProducts = vm.classProducts.slice(startItem, endItem);
        vm.createPagination(page);
      },
      // 模擬 API Pagination 組件
      createPagination(page) {
        const vm = this;
        let paginationData = {};
        paginationData.total_pages = Math.ceil(vm.classProducts.length / 9);
        paginationData.current_page = page;
        paginationData.current_page < paginationData.total_pages ? paginationData.has_next = true : paginationData
          .has_next = false;
        paginationData.current_page == 1 ? paginationData.has_pre = false : paginationData.has_pre = true;
        vm.pagination = paginationData;
      },
      // 增加商品到購物車
      addProductToCart(id, qty = 1) {
        const vm = this;
        const url = `${process.env.API_Server}/api/${process.env.API_Path}/cart`;
        let product = {
          'product_id': id,
          'qty': qty,
        }
        vm.effect.addLoading = id;
        vm.$http.post(url, {
          data: product
        }).then((response) => {
          // 隨機變數觸發更新購物車列表
          vm.updateCart = Date.now();
          vm.$bus.$emit('message:push', response.data.message, 'success');
          vm.effect.addLoading = '';
        })
      },
      // 跳轉指定商品細節頁面
      toProductDetail(id) {
        const vm = this;
        vm.$router.push({
          path: `/ProductDetail/${id}`
        });
      }
    },
    // 監控$route.Id - 判斷切換動作
    watch: {
      '$route'() {
        this.getThisProductList();
      }
    },
    created() {
      this.getProductList();
    },
  }

</script>
