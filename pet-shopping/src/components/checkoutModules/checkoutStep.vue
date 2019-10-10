<template>
  <div>
    <ul class="checkoutStep">
      <li class="checkoutStep__item">
        <span class="step" :class="{'step--active':step=='checkCart'}"><i class="fas fa-cart-arrow-down"></i></span>
        <p class="name" :class="{'name--active':step=='checkCart'}">確認購買清單</p>
      </li>
      <li class="checkoutStep__item ">
        <span class="step" :class="{'step--active':step=='createOrder'}"><i class="far fa-user"></i></span>
        <p class="name" :class="{'name--active':step=='createOrder'}">填寫訂購資料</p>
      </li>
      <li class="checkoutStep__item">
        <span class="step" :class="{'step--active':step=='showOrderDetail'}"><i class="far fa-credit-card"></i></span>
        <p class="name" :class="{'name--active':step=='showOrderDetail'}">查看訂單細節</p>
      </li>
      <li class="checkoutStep__item checkoutStep--cancel">
        <span class="step" :class="{'step--active':step=='completeOrder'}"><i class="far fa-handshake"></i></span>
        <p class="name" :class="{'name--active':step=='completeOrder'}">完成訂單</p>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: ["step"]
  }

</script>
