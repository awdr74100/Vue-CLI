<template>
  <div>
    <div class="userContact">
      <div class="wrap">
        <header class="header">
          <span><i class="fas fa-file-contract"></i></span>
          <h3>聯絡我們</h3>
        </header>
        <div class="container">
          <div class="row">
            <div class="col-12">
              <div class="location">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1807.1613726459457!2d121.6148286!3d25.0570479!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442ab5881ed5a01%3A0xf1fd9515ad913fc4!2zMTE15Y-w5YyX5biC5Y2X5riv5Y2A5LiJ6YeN6LevMTktNuiZnw!5e0!3m2!1szh-TW!2stw!4v1570272206483!5m2!1szh-TW!2stw"
                  width="100%" height="450" frameborder="0" style="border:0;" allowfullscreen=""></iframe>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <div class="message">
                <div class="name">問題反應<i class="fas fa-comment-dots"></i></div>
                <p class="ex">如果您有任何疑問，或想回饋反映的意見，歡迎與我們聯繫。</p>
                <form action="#" class="form">
                  <div class="inputRow">
                    <label for="name">你的姓名</label>
                    <input type="text" name="name" id="name" placeholder="我們如何稱呼你？">
                  </div>
                  <div class="inputRow">
                    <label for="contact">聯絡方式</label>
                    <input type="tel" name="contact" id="contact" placeholder="提供電話號碼">
                    <input type="email" name="mail" id="contact" placeholder="提供Email">
                  </div>
                  <div class="inputRow">
                    <label for="remark" class="remark">訊息內容</label>
                    <textarea name="remark" id="remark" cols="30" rows="8" placeholder="你想告訴我們什麼？"></textarea>
                  </div>
                  <div class="inputRow">
                    <button class="btn" @click.prevent="sendForm">送出訊息</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer class="footer">
        <div class="link">
          <a href="https://reurl.cc/oD15r3"><i class="fab fa-github"></i></a>
          <a href="https://reurl.cc/9zGRvv"><i class="fab fa-codepen"></i></a>
        </div>
        <p>資料、圖片來源皆來自網路，僅用來做為學習用途。</p>
      </footer>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      sendForm() {
        this.$bus.$emit('message:push', '以傳送訊息', 'success');
      },
    }
  }

</script>
