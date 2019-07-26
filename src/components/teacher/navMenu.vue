<template>
    
      <div id="nav">
        
         <el-menu :default-active="this.$route.path" :router="true" class="el-menu-demo" mode="horizontal" @select="handleSelect">
     <el-menu-item ><router-link to="/tehindex"> 
     <img src="../../assets/images/logo.png" alt="" srcset="" style="margin-right:10px"><span>仿真实训平台</span> 
     </router-link> 
     </el-menu-item>
     <el-menu-item style="padding-left:90px"> <el-input v-model="input" placeholder="搜索课程名称"></el-input><i class="el-icon-search"></i></el-menu-item>
     <el-menu-item style="padding-right:100px"> <router-link to="/kcb" index="5"></router-link> </el-menu-item>
      <!-- <el-menu-item > <router-link to="/kcb"> <el-menu-item index="1">课程表</el-menu-item></router-link> </el-menu-item>
      <el-menu-item > <router-link to="/myclass"><el-menu-item index="2">我的班级</el-menu-item></router-link> </el-menu-item>
      <el-menu-item > <router-link to="/personal"><el-menu-item index="3">个人中心</el-menu-item></router-link> </el-menu-item>
      <el-menu-item > <router-link to="/skzx"><el-menu-item index="4" >上课中心</el-menu-item></router-link></el-menu-item> -->
      <el-menu-item > <el-menu-item index="/kcb">课程表</el-menu-item> </el-menu-item>
      <el-menu-item > <el-menu-item index="/myclass">我的班级</el-menu-item> </el-menu-item>
      <el-menu-item > <el-menu-item index="/personal">个人中心</el-menu-item> </el-menu-item>
      <el-menu-item > <el-menu-item index="/skzx" >上课中心</el-menu-item></el-menu-item>
         </el-menu> 
       <router-view/>

    
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
      handleSelect(key, keyPath) {   
      }
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
</style>


