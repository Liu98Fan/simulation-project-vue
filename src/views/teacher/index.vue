<template>
    <div class="home">
      <navMenu />
      <mangerMenu/>
      <tehMain/>
    </div>
    
</template>
<script>
import navMenu from '@/components/teacher/navMenu.vue'
import mangerMenu from '@/components/teacher/mangerMenu.vue'
import  tehMain from '@/components/teacher/tehMain.vue'
  export default {
      name: 'home',
      components: {
        navMenu,
        mangerMenu,
        tehMain
      }
  }
</script>