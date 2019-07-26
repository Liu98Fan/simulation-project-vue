<template>
      <div id="nav">
         <el-menu :default-active="this.$route.path" :router="true" class="el-menu-demo" mode="horizontal" @select="handleSelect">
     <el-menu-item ><router-link to="/studentIndex"> 
     <img src="../../assets/images/logo.png" alt="" srcset="" style="margin-right:10px"><span>仿真实训平台</span> 
     </router-link> 
     </el-menu-item>
     <el-menu-item style="padding-left:90px"> <el-input v-model="input" placeholder="搜索课程名称"></el-input><i class="el-icon-search"></i></el-menu-item>
     <el-menu-item style="padding-right:100px"> <router-link to="/kcb" index="5"></router-link> </el-menu-item>
      <el-menu-item> <el-menu-item index="/professionalClass">专业课堂</el-menu-item> </el-menu-item>
      <el-menu-item> <el-menu-item index="/myStudy">我的学习</el-menu-item> </el-menu-item>
      <el-menu-item> <el-menu-item index="/studentPersonalCenter">个人中心</el-menu-item> </el-menu-item>
         </el-menu> 
       <!-- <router-view/> -->
      </div>
      
</template>
<script>
export default {
    name:'navMenu',
     data() {
      return {
        activeIndex:'',   
        input: ''
      };
      
    },
    methods: {
    //   handleSelect(key, keyPath) {   
    //   }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

a { 
    text-decoration: none
  }
 span {
   font-size: 20px;
   color: #000;
 }  
 .el-menu--horizontal>.el-menu-item.is-active {
    border-bottom: 2px solid #fff; 
}
</style>



