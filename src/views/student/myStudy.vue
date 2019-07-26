<template>
    <div class="myStudy">
      <stuNavMenu/>
      <el-menu :default-active="this.$route.path" :router="true" class="el-menu-demo" mode="horizontal">
        <el-menu-item style="padding-left:0px"> <router-link to="/kcb" index="4"></router-link> </el-menu-item>
        <el-menu-item> <el-menu-item index="/professionalClass">我的实验</el-menu-item> </el-menu-item>
        <el-menu-item> <el-menu-item index="/myStudy/myHomework">我的作业</el-menu-item> </el-menu-item>
        <el-menu-item> <el-menu-item index="/myStudy/myGrade">我的成绩</el-menu-item> </el-menu-item>
        <el-menu-item> <el-menu-item index="/myStudy/mySchedule">我的课程表</el-menu-item> </el-menu-item>
      </el-menu> 

    </div>
</template>
<script>
import stuNavMenu from '@/components/student/studentNavMenu.vue'
  export default {
      name: 'myStudy',
      components: {
        stuNavMenu
      },
      data() {
      return {
        activeIndex:'',   
        input: ''
      };
      
    },
  }
</script>
<style scoped>
el-menu{
  background: #f1f1f1;
}
el-menu-item{
background: #f1f1f1;
}
.el-menu-demo{
  background: #f1f1f1;
}
</style>
