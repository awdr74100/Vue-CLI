<template>
  <div>
    <div class="userHome">
      <section class="swiper-container">
        <Swiper />
        <div class="message"><span>嚴選商品 x 效率服務</span><br>
          提供最精緻、最溫暖的服務，滿足飼主與毛孩，</div>
        <div class="prompt">
          <i class="fas fa-angle-double-down"></i>
          <p>Scroll Down</p>
          <i class="fas fa-angle-double-down"></i>
        </div>
      </section>
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
  import Swiper from './Swiper';
  export default {
    components: {
      Swiper,

    }
  }

</script>
