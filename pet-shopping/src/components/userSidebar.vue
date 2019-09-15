<template>
  <div>
    <div class="userSidebar">
      <div class="logo"><a href="#"></a></div>
      <input type="text" name="search" id="" placeholder="搜尋商品">
      <ul class="list">
        <li><a href="#">首　　頁</a></li>
        <li><a href="#">關於我們</a></li>
        <li>
          <a href="#" @click="dropdownOpen = !dropdownOpen">嚴選商品<i class="fas fa-chevron-down arrowLink"
              :class="{'arrowLink--active':dropdownOpen}"></i></a>
          <ul class="dropdownList" :class="{'dropdownList--active':dropdownOpen}">
            <li><a href="">狗狗飼料</a></li>
            <li><a href="">狗狗罐頭</a></li>
            <li><a href="">貓咪飼料</a></li>
            <li><a href="">貓咪罐罐</a></li>
          </ul>
        </li>
        <li><a href="#">最新消息</a></li>
        <li><a href="#">領養專區</a></li>
        <li><a href="#">聯絡我們</a></li>
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
