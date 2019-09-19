<template>
  <div>
    <div class="userSidebar">
      <div class="logo">
        <router-link to="/"></router-link>
      </div>
      <input type="text" name="search" id="" placeholder="搜尋商品">
      <ul class="list">
        <li>
          <router-link to="/">首　　頁</router-link>
        </li>
        <li>
          <router-link to="/About">關於我們</router-link>
        </li>
        <li>
          <a href="#" @click.prevent="dropdownOpen = !dropdownOpen">嚴選商品<i class="fas fa-chevron-down arrowLink"
              :class="{'arrowLink--active':dropdownOpen}"></i></a>
          <ul class="dropdownList" :class="{'dropdownList--active':dropdownOpen}">
            <li><router-link to="/ProductList/全部商品">全部商品</router-link></li>
            <li><router-link to="/ProductList/品牌狗飼料">品牌狗飼料</router-link></li>
            <li><router-link to="/ProductList/品牌貓飼料">品牌貓飼料</router-link></li>
            <li><router-link to="/ProductList/寵物營養品">寵物營養品</router-link></li>
            <li><router-link to="/ProductList/貓砂與貓砂盆">貓砂與貓砂盆</router-link></li>
          </ul>
        </li>
        <li><a href="#">最新消息</a></li>
        <li><a href="#">領養專區</a></li>
        <li><a href="#">聯絡我們</a></li>
        <li><a href="#" class="mt-30"><i class="fas fa-shopping-cart"></i>購物車</a></li>
        <li>
          <!-- <a href="#"><i class="fas fa-user-cog"></i>後台管理</a> -->
          <router-link to="/admin/productList"><i class="fas fa-user-cog"></i>後台管理</router-link>
        </li>
      </ul>
      <div class="privacy">
        <h4>隱私權政策</h4>
        <p>Copyright © 2019 by Roya</p>
        <span><i class="fab fa-github"></i><i class="fab fa-codepen ml-20"></i></span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dropdownOpen: false,
      }
    },
  }

</script>
