<template>
  <transition name="slide">
    <div class="content">
      <div class="content-main">
        <div>
          <br>
          <br>
          <br>
          <span style="margin-left:150px">姓名：&nbsp;</span>
          <span style="text-align: center;margin-left: 100px">李白</span>
        </div>
        <br>
        <div>
          <span style="margin-left:150px">学号：&nbsp;</span>
          <span style="text-align: center;margin-left: 100px">123456789</span>
        </div>
        <br>
        <div>
          <span style="margin-left:150px;">头像：&nbsp;</span>
          <span><img src="../../../assets/images/stu.png" style="width:100px;height:100px;margin-left: 100px;"></span>
        </div>
        <br>
        <div>
          <span style="margin-left:150px">学习宣言：&nbsp;</span>
          <span style="text-align: center;margin-left: 67px">好好学习</span>
        </div>
          <br>
          <div>
           <span style="margin-left:150px">学校：&nbsp;</span>
          <span style="text-align: center;margin-left: 100px">育才中学</span>
          </div>
          <br>
          <div>
           <span style="margin-left:150px">班级：&nbsp;</span>
          <span style="text-align: center;margin-left: 100px">三年级二班</span>
          </div>
          <br>
          <div>
          <span style="margin-left:150px">联系方式：&nbsp;</span>
          <span style="text-align: center;margin-left: 67px">123456789</span>
          </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name:'basicInformation' ,
}
</script>

<style scoped>
.content{
  background: #fff;
  width: 850px; 
  height: 800px; 
  margin-top:50px;
  margin-left: 350px; 
  }
.content-main{
  margin: 50px;
   text-align: left;
   }
</style>
