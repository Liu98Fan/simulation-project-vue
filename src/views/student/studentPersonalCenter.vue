<template>
  <div class="studentPersonalCenter">
    <stuNavMenu/>
    <div class="menu">
      <ul class="menu-ul">
        <router-link class="menu-link" to="/studentPersonalCenter/basicInformation" tag="li">基本信息</router-link>
        <router-link class="menu-link" to="/studentPersonalCenter/modifyPassword" tag="li">修改密码</router-link>
        <router-link class="menu-link" to="/studentPersonalCenter/modifyInformation" tag="li">修改个人信息</router-link>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import stuNavMenu from '@/components/student/studentNavMenu.vue'
  export default {
      name: 'studentPersonalCenter',
      components: {
        stuNavMenu
      },

  }
</script>
<style scoped>
.menu{background: #fff; width: 300px; height: 800px; margin-top: 50px; text-align: left; color: #737373;position:absolute;}
.menu-ul{padding: 0; margin: 0;}
.router-link-active{ color: #353535; background: #DCF9F5;}
.menu-link{list-style-type: none; height: 60px; cursor: pointer; line-height: 60px; padding: 0 0 0 25px; transition: all .4s;}
</style>
