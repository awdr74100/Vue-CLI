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
            <li class="col-4">
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
      }
    },
    created() {
      // console.log(this.$route.params.id);
      this.fetchData();
    },
    watch: {
      '$route': 'fetchData',
    },
    methods: {
      getSortMode(e) {
        console.log(this);
      },
      fetchData() {
        const vm = this;
        let id = vm.$route.params.id;
        console.log(id);
        // const url = `${process.env.API_Server}/api/${process.env.API_Path}/products/all`;
        // vm.$http.get(url).then((response) => {
        //   console.log(response.data);
        // })
      },
    },
  }

</script>
