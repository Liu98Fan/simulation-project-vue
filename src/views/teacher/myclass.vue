<template>
    <div class="myclass">
        
        <navMenu/>
        <h1>我的班级</h1>
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
