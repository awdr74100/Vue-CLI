<template>
  <div>
    <loading :active.sync="effect.isLoading">
      <template slot="default">
        <div class="loading-pulse left-125"></div>
      </template>
    </loading>
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
                <router-link to="/ProductList/品牌狗飼料" class="card">
                  <div class="img img--class1">品牌狗飼料</div>
                </router-link>
              </div>
            </div>
            <div class="col-4">
              <div class="classCard">
                <router-link to="/ProductList/品牌貓飼料" class="card">
                  <div class="img img--class2">品牌貓飼料</div>
                </router-link>
              </div>
            </div>
            <div class="col-4">
              <div class="classCard">
                <router-link to="/ProductList/寵物營養品" class="card">
                  <div class="img img--class3">寵物營養品</div>
                </router-link>
              </div>
            </div>
            <div class="col-4">
              <div class="classCard">
                <router-link to="/ProductList/貓砂與貓砂盆" class="card">
                  <div class="img img--class4">貓砂與貓砂盆</div>1
                </router-link>
              </div>
            </div>
            <div class="col-4">
              <div class="classCard">
                <router-link to="/ProductList/寵物戶外用品" class="card">
                  <div class="img img--class5">寵物戶外用品</div>
                </router-link>
              </div>
            </div>
            <div class="col-4">
              <div class="classCard">
                <router-link to="/ProductList/全部商品" class="card">
                  <div class="img img--class6">全部商品</div>
                </router-link>
              </div>
            </div>
          </div>
          <!-- couponCard -->
          <div class="row bg-dark mb-30 mt-30">
            <div class="col-8">
              <div class="couponCard">
                <h4>慶祝開幕，Coupon大放送</h4>
                <p>毛孩百貨正式開幕，全館商品免運費，還有許多優惠代碼等你來領取。</p>
              </div>
            </div>
            <div class="col-4">
              <div class="couponCard">
                <router-link to="/Coupon">立即領取</router-link>
                <!-- <a href="#">立即領取</a> -->
              </div>
            </div>
          </div>
          <!-- productCard title -->
          <div class="row">
            <div class="col-12">
              <div class="title">
                <div class="name  name--like">
                  <i class="fas fa-heart"></i>
                  <h3>猜你喜歡</h3>
                </div>
                <router-link to="/ProductList/全部商品" class="more">查看更多</router-link>
              </div>
            </div>
          </div>
          <!-- productCard -->
          <ul class="row mb-40">
            <li class="col-4" v-for="(item, index) in randomProduct" :key="index">
              <div class="productCard">
                <div class="img" :style="{backgroundImage:`url(${item.imageUrl})`}"></div>
                <div class="detail">
                  <button class="detail__view" @click.prevent="toProductDetail(item.id)">VIEW DETAIL</button>
                </div>
                <div class="content">
                  <h4>{{item.title}}</h4>
                  <p class="group"><i class="fas fa-tag"></i>{{item.category}}</p>
                </div>
              </div>
            </li>
          </ul>
          <!-- trackCard -->
          <div class="row bg-dark mb-40 mt-30">
            <div class="col-6">
              <div class="trackCard">
                <p>想要接收最即時的優惠資訊？<br>快來訂閱「毛孩百貨」吧！</p>
              </div>
            </div>
            <div class="col-6">
              <div class="trackCard">
                <input type="email" name="email" id="email" placeholder="請輸入Email" v-validate="'required|email'"
                  :class="{'error':errors.has('email')}">
                <button @click="trackWebSite">訂閱</button>
              </div>
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
        // Loading效果觸發
        effect: {
          isLoading: false,
        },
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
          vm.randomGetProduct();
        })
      },
      // 隨機獲得不同的商品
      randomGetProduct() {
        const vm = this;
        let productLen = vm.products.length;
        let itemLen = 6;
        let object = {};
        // 隨機取出不重複的商品
        while (vm.randomProduct.length < itemLen) {
          let r = parseInt(Math.random() * productLen);
          if (!object[r]) {
            object[r] = true;
            vm.randomProduct.push(vm.products[r]);
          }
        }
      },
      // 跳轉指定商品細節頁面
      toProductDetail(id) {
        const vm = this;
        vm.$router.push({
          path: `/ProductDetail/${id}`
        });
      },
      // 模擬訂閱優惠資訊
      trackWebSite() {
        this.$validator.validate().then(valid => {
          if (valid) {
            this.$bus.$emit('message:push', '訂閱成功', 'success');
          } else {
            this.$bus.$emit('message:push', 'Email填寫錯誤，請再檢查一次', 'danger');
          }
        });
      }
    },
    created() {
      this.getProductList();
    },
  }

</script>
