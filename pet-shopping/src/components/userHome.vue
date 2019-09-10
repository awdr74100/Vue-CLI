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
      <footer>
        <userFooter />
      </footer>
    </div>
  </div>
</template>

<script>
  import Swiper from './Swiper';
  import userFooter from './userFooter';
  export default {
    components: {
      Swiper,
      userFooter,
    }
  }

</script>
