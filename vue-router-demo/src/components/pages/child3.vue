<template>
  <div class="hello">
    <p>我是分頁3</p>
  </div>
</template>

<script>
  export default {

    data() {
      return {
        text: 'blue'
      }
    },
    // created() {
    //   console.log(this.$route.params.id);
    //   const thisId = this.$route.params.id;
    //   this.$http.get(`https://randomuser.me/api/?seed=${thisId}`).then((response) => {
    //     console.log(response.data)
    //   })
    // }
  }

</script>
