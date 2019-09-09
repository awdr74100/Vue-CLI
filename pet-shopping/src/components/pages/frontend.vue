<template>
  <div>
    <div class="frontend">
      <aside>
        <userSidebar />
      </aside>
      <main>
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script>
  import userSidebar from '../userSidebar';
  export default {
    components: {
      userSidebar,
    }
  }

</script>
