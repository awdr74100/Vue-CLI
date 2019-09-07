<template>
  <div>
    <div class="wrap">
      <header class="header">
        <Topbar />
        <Navbar />
      </header>
      <section>
        <router-view></router-view>
      </section>
      <Footer />
    </div>
  </div>
</template>

<script>
  import Topbar from '../Topbar';
  import Navbar from '../Navbar';
  import Footer from '../Footer';

  export default {
    components: {
      Topbar,
      Navbar,
      Footer,
    }
  }

</script>
