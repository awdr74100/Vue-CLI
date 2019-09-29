<template>
  <div class="editOrderSection">
    <div class="name">
      <i class="far fa-edit"></i>
      <h3>填寫訂購資料</h3>
    </div>
    <div class="order">
      <form action="#" class="form">
        <h3 class="sectionTitle">收件人資訊</h3>
        <label for="name">姓名</label>
        <div class="userRow">
          <div class="icon"><i class="fas fa-user"></i></div>
          <input type="text" name="name" id="name">
        </div>
        <label for="phone">連絡電話</label>
        <div class="userRow">
          <div class="icon"><i class="fas fa-phone"></i></div>
          <input type="tel" name="phone" id="phone">
        </div>
        <label for="mail">電子郵件</label>
        <div class="userRow">
          <div class="icon"><i class="fas fa-envelope"></i></div>
          <input type="email" name="mail" id="mail">
        </div>
        <label for="address">收件地址</label>
        <div class="userRow">
          <div class="icon"><i class="fas fa-map-marker-alt"></i></div>
          <input type="text" name="address" id="address">
        </div>
        <label for="remarks">備註</label>
        <textarea name="remarks" id="remarks" cols="30" rows="7"></textarea>
      </form>
      <div class="pay">
          <h3 class="sectionTitle">付款方式</h3>
        <ul class="list">
          <li class="list__item">
            <input type="radio" name="pay" id="atm" disabled>
            <label for="atm"><i class="fab fa-cc-apple-pay"></i>網路ATM / ATM 櫃員機 (暫不開放)</label>
          </li>
          <li class="list__item">
            <input type="radio" name="pay" id="card" disabled>
            <label for="card"><i class="fab fa-cc-visa"></i>信用卡 (暫不開放))</label>
          </li>
          <li class="list__item">
            <input type="radio" name="pay" id="test" checked>
            <label for="test"><i class="fas fa-cubes"></i>模擬付款</label>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
