<template>
  <transition name="slide">
    <div class="content">
      <div class="content-main">
        <br>
        <br>
        <br>
        <p style="width:116px;float:left;margin-top: 10px;margin-left: 104px;">请输入旧密码:&nbsp;</p>
          <el-input v-model="oldPassword" style="width:300px;float:left"></el-input>
          <br>
          <br>
          <br>
          <p style="width:116px;float:left;margin-top: 10px;margin-left: 104px;">请输入新密码:&nbsp;</p>
          <el-input v-model="newPassword" style="width:300px;float:left"></el-input>
          <br>
          <br>
          <br>
          <p style="width:116px;float:left;margin-top: 10px;margin-left: 104px;">确认密码:&nbsp;</p>
          <el-input v-model="confirmPassword" style="width:300px;float:left"></el-input>
          <br>
          <br>
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
    name: 'studentPersonalCenter',
    data() {
    return {
      oldPassword:'',
      newPassword:'',
      confirmPassword:'',
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
