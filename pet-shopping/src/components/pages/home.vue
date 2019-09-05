<template>
  <div>
    <div class="wrap">
      <header class="header">
        <Topbar />
        <Navbar />
      </header>
      <div class="banner">
        <Swiper />
      </div>
      <section>
        <Features />
      </section>
    </div>
  </div>
</template>

<script>
  import Topbar from '../Topbar';
  import Navbar from '../Navbar';
  import Swiper from '../Swiper';
  import Features from '../features';

  export default {
    components: {
      Topbar,
      Navbar,
      Swiper,
      Features,
    }
  }

</script>
