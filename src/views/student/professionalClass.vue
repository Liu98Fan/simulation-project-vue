<template>
    <div class="professionalClass">
        <stuNavMenu/>
        <h1>这里是学生专业课堂页面</h1>
        <el-row :gutter="20">
            <el-col :span="6"><div class="grid-content bg-purple">
                <img src="../../assets/images/test.jpg" alt="" style="width:100%">
                <p style="margin-top:5px">
                    <span style="margin-left:10px">杠杆原理</span>
                    <br/>
                    <span style="margin-left:10px">西安交通大学</span>
                    <router-link :to="`/studentVirtualClass/abcdefg`" style="margin-left:40px">进入实验</router-link> </p>
            </div></el-col>


            <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
        </el-row>
    </div>
</template>
<script>
import stuNavMenu from '@/components/student/studentNavMenu.vue'
  export default {
      name: 'professionalClass',
      components: {
        stuNavMenu
      }
  }
</script>
