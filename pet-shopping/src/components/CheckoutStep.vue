<template>
  <div>
    <ul class="checkoutStep">
      <li class="checkoutStep__item">
        <span class="step step--active"><i class="fas fa-cart-arrow-down"></i></span>
        <p class="name name--active">確認購買清單</p>
      </li>
      <li class="checkoutStep__item ">
        <span class="step"><i class="far fa-user"></i></span>
        <p class="name">填寫訂購資料</p>
      </li>
      <li class="checkoutStep__item">
        <span class="step"><i class="far fa-credit-card"></i></span>
        <p class="name">付款/完成訂單</p>
      </li>
      <li class="checkoutStep__item checkoutStep--cancel">
        <span class="step"><i class="far fa-handshake"></i></span>
        <p class="name">購買明細確認</p>
      </li>
    </ul>
  </div>
</template>
