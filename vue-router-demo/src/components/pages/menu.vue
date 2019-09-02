<template>
  <div class="hello">
    <h1>我是分頁</h1>
    <router-link to="/page">卡片一</router-link>
    <router-link to="/page/child2">卡片二</router-link>
    <router-link to="/page/child3">卡片三</router-link>
     <a href="#"  @click.prevent="updatePath">切換到指定頁面</a>
     <a href="#"  @click.prevent="beforePath">回到前一個頁面</a>
  </div>
</template>

<script>
  export default {

    data () {
      return {

      }
    },
    methods:{
        updatePath:function(){
            this.$router.push("/page/child2");
        },
        beforePath(){
            this.$router.back();
        }
    }
  }

</script>
