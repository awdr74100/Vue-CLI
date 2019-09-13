<template>
  <div>
    <div class="userSidebar">
      <div class="logo"><router-link to="/"></router-link></div>
      <input type="text" name="search" id="" placeholder="搜尋商品">
      <ul class="list" v-if="visibility == 'b'">
        <li class="list__item">
          <router-link to="/">首　　頁</router-link>
        </li>
        <li class="list__item">
          <router-link to="/About">關於我們</router-link>
        </li>
        <li class="list__item">
          <router-link to="/ProductList">嚴選商品</router-link>
          <span class="arrow arrow--Right"><i class="fas fa-chevron-right"></i></span>
        </li>
        <li class="list__item"><a href="#">最新消息</a></li>
        <li class="list__item"><a href="#">領養專區</a></li>
        <li class="list__item"><a href="#">聯絡我們</a></li>
      </ul>
      <!-- <ul class="list">
        <li class="list__item" @click="visibility = 'b' ">
          <span class="arrow arrow--Left"><i class="fas fa-chevron-left"></i></span>
          <router-link to="/ProductList">貓咪飼料</router-link>
        </li>
        <li class="list__item">
          <router-link to="/ProductList">貓咪罐頭</router-link>
        </li>
        <li class="list__item">
          <router-link to="/ProductList">貓咪用品</router-link>
        </li>
        <li class="list__item">
          <router-link to="/ProductList">狗狗飼料</router-link>
        </li>
        <li class="list__item">
          <router-link to="/ProductList">狗狗罐頭</router-link>
        </li>
        <li class="list__item">
          <router-link to="/ProductList">狗狗零食</router-link>
        </li>
      </ul> -->
      <div class="user">
        <router-link to="/admin/productList"><span class="userIcon"><i class="fas fa-user-cog"></i></span>後台管理
        </router-link>
        <a href="#"><span class="userIcon"><i class="fas fa-shopping-cart"></i></span>購物車</a>
      </div>
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
        visibility: 'b',
      }
    },
  }

</script>
