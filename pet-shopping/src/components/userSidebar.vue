<template>
  <div>
    <div class="userSidebar">
      <div class="logo"></div>
      <input type="text" name="search" id="" placeholder="搜尋商品">
      <ul class="list">
        <li class="list__item">
          <router-link to="/">首　　頁</router-link>
        </li>
        <li class="list__item">
          <router-link to="/About">關於我們</router-link>
        </li>
        <li class="list__item">
          <router-link to="/ProductList">嚴選商品</router-link>
        </li>
        <li class="list__item"><a href="#">最新消息</a></li>
        <li class="list__item"><a href="#">領養專區</a></li>
        <li class="list__item"><a href="#">聯絡我們</a></li>
        <li class="list__item mt-30">
          <router-link to="/admin/productList"><i class="fas fa-user-cog"></i>後台管理</router-link>
        </li>
        <li class="list__item"><a href="#"><i class="fas fa-shopping-cart"></i>購物車</a></li>
      </ul>
      <div class="privacy">
        <h4>隱私權政策</h4>
        <p>Copyright © 2019 by Roya</p>
        <span><i class="fab fa-github"></i><i class="fab fa-codepen ml-20"></i></span>
      </div>
    </div>
  </div>
</template>
