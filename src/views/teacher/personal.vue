<template>
    <div class="personal">
       
        <navMenu/>
        <h1>个人中心</h1>
    </div>
</template>
<script>
import navMenu from '@/components/teacher/navMenu.vue'
  export default {
      name: 'home',
      components: {
        navMenu
      }
  }
</script>
