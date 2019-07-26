<template>
    <div id="home">
       <el-row>
  <el-col :span="5"><div class="grid-content">
      <img src=".././assets/images/logo.png" alt="" srcset="" style="margin-right:10px;float:left"><span style="line-height:45px">仿真教学实训平台</span>
      </div></el-col>
  <el-col :span="14"><div class="grid-content">&nbsp;</div></el-col>
  <el-col :span="5"><div class="grid-content " style="text-align:right">
        <a href="#" @click="dialogVisible = true">登录</a> | <a href="#">注册</a>
      </div></el-col>
</el-row>
      <!--轮播-->
       <el-row>
  <el-col :span="18"><div class="grid-content" style="height:300px">
       <el-carousel indicator-position="outside">
    <el-carousel-item v-for="item in imgList" :key="item.id">
        <img :src="item.idView" alt="" style="width:100%;height;auto" >

    </el-carousel-item>
  </el-carousel>
      </div></el-col>
  <el-col :span="6" ><div class="grid-content bg-purple" style="text-align:center;height:300px;">
           <div style="background-color:#ccc;">
           <p style="margin:0">免费学习名校名师的精品课程</p>
           <p><img src=".././assets/images/loginHeader.png" alt=""></p>
           <el-button type="primary" @click="dialogVisible = true">登录</el-button>
              <!--登录对话框-->
     <el-dialog
  title="欢迎使用仿真实验平台"
  :visible.sync="dialogVisible"
  width="30%">
  <span>
      <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
  <el-form-item label="工号/学号">
    <el-input v-model="formLabelAlign.region"></el-input>
  </el-form-item>
  <el-form-item label="密码">
    <el-input v-model="formLabelAlign.type" type="password"></el-input>
  </el-form-item>
</el-form>
  </span>
 <el-radio-group v-model="radio">
    <el-radio :label="3">教师</el-radio>
    <el-radio :label="6">学生</el-radio>
    <el-radio :label="9">游客</el-radio>
  </el-radio-group>
  <span slot="footer" class="dialog-footer" style="text-align:center">
     <router-link :to="activePage"><el-button type="primary" @click="logEvents">快捷登录</el-button></router-link>
  </span>
</el-dialog>
           </div>
      </div>
      </el-col>
</el-row>
      <div class="bodyContainer">
      <!--热门课程-->
      <h3>热门课程</h3>
      <el-row :gutter="20">
  <el-col :span="6"><div class="grid-content bg-purple" style="height:200px"></div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple" style="height:200px"></div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple" style="height:200px"></div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple" style="height:200px"></div></el-col>
</el-row>
      </div>

    </div>
</template>
<script>
    import {login} from "../util/api";
    import {mapActions} from 'vuex'
    export default {
     data() {
      return {
          radio: 3,
          labelPosition: 'right',
          dialogVisible: false,
          activePage:'/',

          imgList:[
              {id:0,idView: require('.././assets/images/lunbo01.jpg')},
              {id:1,idView: require('.././assets/images/lunbo02.png')},
              {id:2,idView: require(".././assets/images/lunbo03.png")},
              {id:3,idView: require(".././assets/images/lunbo04.png")},
              ],
        labelPosition: 'right',
        formLabelAlign: {
          name: '',
          region: '',
          type: ''
        },
      };
    },
     methods:{
         ...mapActions(['updateUser']),
          logEvents(){
            this.dialogVisible=false
            let identity = 'student'

            let toPath = ''
            if(this.radio===3){
                //教师
                identity = 'teacher'
                toPath='/tehindex'
            }else if(this.radio===6){
                //学生
                identity = 'student'
                toPath='/studentIndex'
            }else if(this.radio===9){
                //游客
                identity = 'visitor'
                toPath='/'
            }

            login(identity).then(res=>{
              console.log(res)
              this.updateUser(res.data)
                this.$router.push(toPath)
            }).catch(error=>{
              console.log(error)
            })



          }
        }
}
</script>

<style>

a{
    text-decoration: none;
    color: #303133
}
.el-dialog__footer{
    text-align: center
}
.el-row {
    margin-bottom: 20px;

  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px !important;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>

