<template>
  <div>
    <div class="userHome">
      <!-- Swiper -->
      <section class="swiper-container">
        <Swiper />
        <div class="message"><span>嚴選商品 x 效率服務</span><br>
          提供最精緻、最溫暖的服務，滿足飼主與毛孩，</div>
        <div class="prompt">
          <i class="fas fa-angle-double-down"></i>
          <p>Scroll Down</p>
          <i class="fas fa-angle-double-down"></i>
        </div>
      </section>
      <div class="wrap">
        <div class="container">
          <!-- classCard -->
          <div class="row">
            <div class="col-4">
              <div class="classCard">
                <a href="#" class="card">
                  <div class="img img--class1">品牌狗飼料</div>
                </a>
              </div>
            </div>
            <div class="col-4">
              <div class="classCard">
                <a href="#" class="card">
                  <div class="img img--class2">品牌貓飼料</div>
                </a>
              </div>
            </div>
            <div class="col-4">
              <div class="classCard">
                <a href="#" class="card">
                  <div class="img img--class3">寵物營養品</div>
                </a>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <div class="title">
                <h3><i class="far fa-heart"></i>猜你喜歡</h3>
              </div>
            </div>
          </div>
          <!-- productCard -->
          <ul class="row mb-40">
            <li class="col-4" v-for="(item, index) in randomProduct" :key="index">
              <div class="productCard">
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
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <footer class="footer">
        <div class="link">
          <a href="https://reurl.cc/oD15r3"><i class="fab fa-github"></i></a>
          <a href="https://reurl.cc/9zGRvv"><i class="fab fa-codepen"></i></a>
        </div>
        <p>資料、圖片來源皆來自網路，僅用來做為學習用途。</p>
      </footer>
    </div>
  </div>
</template>

<script>
  import Swiper from './pageModules/Swiper';
  export default {
    components: {
      Swiper,
    },
    data() {
      return {
        // 全部商品
        products: [],
        // 隨機商品
        randomProduct: [],
      }
    },
    methods: {
      // 取得全部商品列表
      getProductList() {
        const url = `${process.env.API_Server}/api/${process.env.API_Path}/products/all`;
        const vm = this;
        // vm.effect.isLoading = true;
        vm.$http.get(url).then((response) => {
          vm.products = response.data.products;
          // vm.effect.isLoading = false;
          vm.randomGetProduct();
        })
      },
      // 隨機獲得不同的商品
      randomGetProduct() {
        const vm = this;
        let productLen = vm.products.length;
        let itemLen = 3;
        let object = {};
        // 隨機取出不重複的商品
        while (vm.randomProduct.length < itemLen) {
          let r = parseInt(Math.random() * productLen);
          if (!object[r]) {
            object[r] = true;
            vm.randomProduct.push(vm.products[r]);
          }
        }
      }
    },
    created() {
      this.getProductList();
    },
  }

</script>
