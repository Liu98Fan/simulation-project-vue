<template>
    <div class="studentIndex">
        <stuNavMenu/>
        
        <h1>这里是学生主页页面</h1>
    </div>
</template>
<script>
import stuNavMenu from '@/components/student/studentNavMenu.vue'
  export default {
      name: 'studentIndex',
      components: {
        stuNavMenu
      }
  }
</script>