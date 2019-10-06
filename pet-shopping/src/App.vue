<template>
  <div id="app">
    <AlertMsg />
    <router-view />
  </div>
</template>

<script>
  import AlertMsg from "./components/pageModules/AlertMsg";
  export default {
    components: {
      AlertMsg,
    },
    name: 'App',
  }

</script>

<style lang="scss">
  // 載入style
  @import './assets/sass/all.scss';

</style>
