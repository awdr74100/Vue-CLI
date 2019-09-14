<template>
  <div>
    <div class="userSidebar">
      <div class="logo"><a href="#"></a></div>
      <input type="text" name="search" placeholder="搜尋商品">
      <ul class="list">
        <li class="list__item">
          <a href="#">首　　頁</a>
        </li>
        <li class="list__item">
          <a href="#">關於我們</a>
        </li>
        <li class="list__item">
          <a href="#" @click="visibility = !visibility">嚴選商品</a>
          <ul class="dropdownList" :class="{'dropdownList--active':visibility}">
            <li><a href="#">貓咪用品</a></li>
            <li><a href="#">狗狗用品</a></li>
            <li><a href="#">貓咪飼料</a></li>
            <li><a href="#">狗狗飼料</a></li>
          </ul>
        </li>
        <li class="list__item">
          <a href="#">最新消息</a>
        </li>
        <li class="list__item">
          <a href="#">領養專區</a>
        </li>
        <li class="list__item">
          <a href="#">聯絡我們</a>
        </li>
      </ul>
      <div class="privacy">
        <h4>隱私權政策</h4>
        <p>Copyright © 2019 by Roya</p>
        <span><i class="fab fa-github"></i><i class="fab fa-codepen ml-20"></i></span>
      </div>
    </div>


    <!-- <div class="userSidebar">
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
    </div> -->
  </div>
</template>

<script>
  export default {
    data() {
      return {
        visibility: false,
      }
    },
  }

</script>
