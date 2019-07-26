<template>
   <transition name="slide">
    <div class="content">
      <div class="content-main">
        <div>
          <br>
          <br>
          <br>
          <span style="margin-left:150px">姓名：&nbsp;</span>
          <el-input style="width:300px;margin-left: 100px" v-model="name">李白</el-input>
        </div>
        <br>
        <div>
          <span style="margin-left:150px">学号：&nbsp;</span>
          <el-input style="text-align: center;margin-left: 100px;width:300px" v-model="id">123456789</el-input>
        </div>
        <br>
        <div>
          <span style="margin-left:150px;margin-top:10px;">头像：&nbsp;</span>
          <span><img src="../../../assets/images/stu.png" style="width:100px;height:100px;margin-left: 100px;"></span>
          <el-button style="margin-left:30px;margin-top:100px">上传</el-button>
        </div>
        <br>
        <div>
          <span style="margin-left:150px">学习宣言：&nbsp;</span>
          <el-input style="text-align: center;margin-left: 67px;width:300px" v-model="declaration">好好学习</el-input>
        </div>
          <br>
          <div>
           <span style="margin-left:150px">学校：&nbsp;</span>
          <el-input style="text-align: center;margin-left: 100px;width:300px" v-model="school">育才中学</el-input>
          </div>
          <br>
          <div>
           <span style="margin-left:150px">班级：&nbsp;</span>
          <el-input style="text-align: center;margin-left: 100px;width:300px" v-model="cla">三年级二班</el-input>
          </div>
          <br>
          <div>
          <span style="margin-left:150px">联系方式：&nbsp;</span>
          <el-input style="text-align: center;margin-left: 67px;width:300px" v-model="phone">123456789</el-input>
          </div>
          <br>
          <br>
          <br>
          <el-button type="primary" @click="success" style="margin-left: 270px;">确认修改</el-button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
    name:'modifyInformation' ,
    data (){
        return{
            name:'李白',
            id:'123456789',
            declaration:'好好学习',
            school:'育才中学',
            cla:'三年级二班',
            phone:'123456789',
        };
    },
    methods: {
    success() {
      this.$alert('保存成功', '', {
        confirmButtonText: '确定'
      });
    },
    }
}
</script>

<style scoped>
.content{
  background: #fff;
  width: 850px; 
  height: 935px; 
  margin-top:50px;
  margin-left: 350px; 
  }
.content-main{margin: 20px; text-align: left;}
</style>
