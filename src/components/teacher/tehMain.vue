<template>
    <div class="tehMain">
       <h3>近期实验</h3>
       <el-row :gutter="20">
  <el-col :span="6"><div class="grid-content bg-purple">
      <img src="../../assets/images/test.jpg" alt="" style="width:100%">
      <p style="margin-top:5px">
      <span style="margin-left:10px">杠杆原理</span>
      <br/>
      <span style="margin-left:10px">西安交通大学</span>
       <router-link :to="`/teacherVirtualClass/abcdefg`" style="margin-left:40px">进入实验</router-link> </p>
      </div></el-col>


  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
</el-row>
       <h3>我的实验</h3>
             <el-row :gutter="20">
  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
</el-row>
       <h3>我的收藏</h3>
             <el-row :gutter="20">
  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
</el-row>
       <h3>实验教师</h3>
       <el-row :gutter="20">
       <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
       <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
       <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
       <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
       <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
       <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
       </el-row>
    </div>
</template>
<style>
  .tehMain{

      border: 1px solid #ccc;
      bottom: 0;
      height: auto;
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
    min-height: 250px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>

