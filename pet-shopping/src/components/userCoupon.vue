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
                <p class="alert" :class="{'alert--open':getCoupon}">優惠代碼：</p>
                <p class="code" :class="{'code--open':getCoupon}">sdf9fwef7</p>
                <button class="btn" :class="{'btn--close':getCoupon}" @click="getCoupon = true">點我領取！</button>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <div class="couponGame">
                <div class="name">
                  <i class="fas fa-gamepad"></i>
                  <p>刮刮樂小遊戲</p>
                </div>
                <div class="ex">
                  <p>遊戲規則：</p>
                  <p>每位顧客可隨機抽取三張刮刮卡</p>
                  <p>刮開即可獲得隨機優惠代碼</p>
                  <span>祝妳中大獎！！</span>
                </div>
                <div class="scratchCard" :class="{'scratchCard--active':couponGame =='get' }">
                  <h3 class="title">刮刮樂</h3>
                  <div class="card">
                    <scratch-card :key="scratchCard.renderCount" :cardWidth="scratchCard.cardWidth"
                      :cardHeight="scratchCard.cardHeight" :finishPercent="scratchCard.finishPercent"
                      imageUrl="https://raw.githubusercontent.com/awdr74100/Learning-process/master/others/colorBackground/bg2.jpg"
                      :brushUrl="scratchCard.brushUrl" :forceReveal="scratchCard.forceReveal" @complete="alertCoupon">
                      <div class="card-content" v-if="randomCoupon[scratchCard.renderCount].discount !== 0">
                        <p>恭喜獲得{{randomCoupon[scratchCard.renderCount].discount}}折優惠卷</p>
                        <span>代碼：{{randomCoupon[scratchCard.renderCount].code}}</span>
                      </div>
                      <div class="card-content" v-else>
                        <p>銘謝惠顧</p>
                      </div>
                    </scratch-card>
                  </div>
                </div>
                <button class="btn btn--start" @click="couponGame = 'get'"
                  v-if="couponGame == 'start' && scratchCard.renderCount <2">我要抽卡！！</button>
                <button class="btn btn--get" @click="scratchCard.renderCount++"
                  v-else-if="scratchCard.renderCount >=0 && scratchCard.renderCount <=1 && couponGame == 'get' ">還可拿{{2 - scratchCard.renderCount}}張刮刮卡</button>
                <button class="btn btn--end" v-else>以達到抽卡上限</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer class="footer">
        <div class="link">
          <a href="https://reurl.cc/W4qG6k" target="_blank"><i class="fab fa-github"></i></a>
          <a href="https://reurl.cc/9zGRvv" target="_blank"><i class="fab fa-codepen"></i></a>
        </div>
        <p>資料、圖片來源皆來自網路，僅用來做為學習用途。</p>
      </footer>
    </div>
  </div>
</template>

<script>
  // 載入vue-scratchCard模組
  import ScratchCard from 'vue-scratchcard';
  // 載入筆刷
  import BRUSH from 'vue-scratchcard/example/brush.png';

  export default {
    components: {
      ScratchCard,
    },
    data() {
      return {
        scratchCard: {
          // renderCount: parseInt(localStorage.getItem('couponNumber')) || 0,
          renderCount: 0,
          cardWidth: 400,
          cardHeight: 100,
          finishPercent: 50,
          brushUrl: BRUSH,
          forceReveal: false,
        },
        getCoupon: false,
        couponGame: 'start',
        randomCouponIndex: 0,
        randomCoupon: [],
      }
    },
    methods: {
      alertCoupon() {
        // alert('恭喜中獎');
        const vm = this;
        let discount = vm.randomCoupon[vm.scratchCard.renderCount].discount;
        if (discount == 0) {
          vm.$bus.$emit('message:push', `沒中獎，幫你QQ`, 'danger');
        } else {
          vm.$bus.$emit('message:push', `恭喜獲得「${discount}折」優惠卷`, 'success');
        }
      },
      // 隨機獲得不同優惠卷
      randomGetCoupon() {
        // 取得所有優惠卷需要Admin，故不使用Ajax拿取
        const objectData = [{
          code: 'idojerjhej',
          discount: 75,
        }, {
          code: 'afwegwegw',
          discount: 8,
        }, {
          code: 'nwbrtbrtb',
          discount: 85,
        }, {
          code: '',
          discount: 0,
        }, {
          code: '',
          discount: 0,
        }, {
          code: '',
          discount: 0,
        }];
        const vm = this;
        let objectDataLen = objectData.length;
        let object = {};
        let itemLen = 3;
        while (vm.randomCoupon.length < itemLen) {
          let r = parseInt(Math.random() * objectDataLen);
          if (!object[r]) {
            object[r] = true;
            vm.randomCoupon.push(objectData[r]);
          }
        }
      }
    },
    // 將抽卡次數上傳到 LocalStorge
    watch: {
      'scratchCard.renderCount'() {
        let strCount = this.scratchCard.renderCount.toString();
        localStorage.setItem('couponNumber', strCount);
      }
    },
    created() {
      this.randomGetCoupon();
    },
  }

</script>
