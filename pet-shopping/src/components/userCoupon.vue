<template>
  <div>
    <div class="userCoupon">
      <div class="wrap">
        <header class="header">
          <span><i class="fas fa-file-contract"></i></span>
          <h3>聯絡我們</h3>
        </header>
        <div class="container">
          <!-- try START -->
          <scratch-card :key="renderCount" :cardWidth="cardWidth" :cardHeight="cardHeight"
            :finishPercent="finishPercent" imageUrl="https://avatars2.githubusercontent.com/u/1077546?s=460&v=4"
            :brushUrl="brushUrl" :forceReveal="forceReveal" @complete="aa">
            <h2 class="card-content">This is a highly secretive message!!!</h2>
          </scratch-card>
          <button @click="forceReveal = true">Force Reveal!</button>
          <button @click="renderCount++">Force Reset</button>
          <!-- try END -->
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
  import ScratchCard from 'vue-scratchcard';
  import BRUSH from 'vue-scratchcard/example/brush.png';
  export default {
    components: {
      ScratchCard
    },
    data() {
      return {
        renderCount: 0,
        cardWidth: 300,
        cardHeight: 300,
        finishPercent: 70,
        brushUrl: BRUSH,
        forceReveal: false,
      }
    },
    methods: {
      aa() {
        console.log('嘿嘿');
      }
    },
    mounted() {

    },
  }

</script>
