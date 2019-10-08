<template>
  <div>
    <div class="userCoupon">
      <div class="wrap">
        <header class="header">
          <span><i class="fas fa-tags"></i></span>
          <h3>優惠活動</h3>
        </header>
        <div class="container">
          <div class="row">
            <div class="col-12">
              <div class="coupon">
                <h3 class="discount">SAVE<span>10%</span>*</h3>
                <p class="content">慶祝「毛孩百貨」正式開幕，9折優惠碼等你來領取！</p>
                <p class="alert">優惠代碼：</p>
                <p class="code">sdf9fwef7</p>
                <button class="btn">取得更多優惠？</button>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <div class="scratchCard">
                <h3 class="title">刮刮樂</h3>
                <div class="ex">
                  <h4>優惠卷列表</h4>
                  <ul class="list">
                    <li class="list__item">8折優惠卷</li>
                    <li class="list__item">9折優惠卷</li>
                    <li class="list__item">75折優惠卷</li>
                    <li class="list__item">6折優惠卷</li>
                    <li class="list__item">5折優惠卷</li>
                  </ul>
                </div>
                <div class="card">
                  <scratch-card :key="renderCount" :cardWidth="cardWidth" :cardHeight="cardHeight"
                    :finishPercent="finishPercent"
                    imageUrl="https://raw.githubusercontent.com/awdr74100/Learning-process/master/jQuery/jQuery%20final%20project/img/banner003.jpg"
                    :brushUrl="brushUrl" :forceReveal="forceReveal" @complete="aa">
                    <div class="card-content">
                      <p>sdf9fwef7</p>
                    </div>
                    <!-- <h2 class="card-content">This is a highly secretive message!!!</h2> -->
                  </scratch-card>
                  <!-- <button @click="forceReveal = true">Force Reveal!</button>
                  <button @click="renderCount++">Force Reset</button> -->
                
                </div>
              
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
  import ScratchCard from 'vue-scratchcard';
  import BRUSH from 'vue-scratchcard/example/brush.png';

  export default {
    components: {
      ScratchCard,
    },
    data() {
      return {
        renderCount: 0,
        cardWidth:500,
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
