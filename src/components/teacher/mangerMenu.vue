<template>
    <div class="mangerMenu">
        <el-row>
          <el-col :span="5"><div class="grid-content left" >
              <el-tree
                  :data="data"
                  :props="defaultProps"
                  accordion
                  @node-click="handleNodeClick"
                  >
            </el-tree>
            </div>
         </el-col>
         <el-col :span="14"><div class="grid-content middle">
                <el-carousel :interval="4000" type="card" height="250px"  >
                <el-carousel-item v-for="item in imgList" :key="item.id" >
                 <h3 class="medium">课程安排--{{ item.day }}</h3>
                 <p>班级:{{item.class}}</p>
                 <p>地点:{{item.location}}</p>
                 <p>时间:{{item.time}}&nbsp;{{item.sort}}</p>

             </el-carousel-item>

             </el-carousel>
            </div>
        </el-col>
             <el-col :span="5" ><div class="grid-content right">
                 <img :src="user.image" alt="" style="float:left;margin-right:10px;">
                 <div style="float:left">
                    <span style="margin-right:100px">你好,{{user.name}}</span>
                     <router-link to="/"><a href="#">退出</a></router-link>
                 <br/><br/>
                 <span style="font-size:14px;">{{user.email}}</span>
                 </div>
                 <div style="clear:left"></div>

                 <p><i class="el-icon-s-comment"></i>消息</p>
                 <hr/>
                 <p style="font-size:14px;"><i class="el-icon-tickets"></i> 1个实验待打分</p>
                 <p style="font-size:14px;"><i class="el-icon-tickets"></i>2分报告带批阅</p>
                 <p style="font-size:14px;"><i class="el-icon-tickets"></i>2个@我的消息</p>
             </div></el-col>
          </el-row>
    </div>
</template>
<script>
    import {mapState} from 'vuex'
  export default {
    name:'mangerMenu',
    data() {
      return {
          imgList:[
              {id:1,day:'周一',class:'八一班',location:'11-309',time:'10.00',sort:'上午3~4节'},
                {id:2,day:'周二',class:'八二班',location:'11-309',time:'8.00',sort:'上午1~2节'},
                  {id:3,day:'周三',class:'八一班',location:'11-309',time:'16.00',sort:'下午7~9节'},
                    {id:4,day:'周四',class:'八二班',location:'11-309',time:'14.00',sort:'下午5~6节'},
                      {id:5,day:'周五',class:'八一班',location:'11-309',time:'10.00',sort:'上午3~4节'},
              ],
        data: [{
          label: '实验管理',
          children: [{
            label: '近期实验',
          },{
            label: '我的实验',
          },{
            label: '我的收藏',
          },{
             label: '全部实验',
          },{
              label:'实验教师'
          }]
        }, {
          label: '课程管理',
          children: [{
            label: '二级 2-1',
          }, {
            label: '二级 2-2',
          },{
            label: '二级 2-3',
          }]
        }, {
          label: '班级管理',
          children: [{
            label: '二级 3-1',
          }, {
            label: '二级 3-2',
          },{
            label: '二级 3-3',
          }]
        },{
            label:'课程管理',
            children:[{
               label: '二级 3-1',
            },{
                 label: '二级 3-2',
            },{
              label: '二级 3-3',
            }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
    methods: {
      handleNodeClick(data) {
        console.log(data);
      }
    },
      computed:{
        ...mapState(['user'])
      }
  };
</script>
<style>


  .el-row {
    margin-top: 10px;
    margin-bottom: 0;

  }
  .grid-content {
    min-height: 300px;
  }

  .left{
      /* border-right: 1px solid #ccc; */
      position: relative;
      padding-left: 60px;


  }
  .right{


     padding-left: 30px
  }

  a{
      text-decoration: none;
      font-size: 14px;

  }
    .el-carousel__item h3 {
    color: #475669;
    font-size: 16px;
    opacity: 0.75;
    margin: 0;
    padding-top:5px;
    padding-bottom: 5px;
    background-color: #409EFF;
    text-align: center;
    color:#303133;

  }

  .el-carousel__item:nth-child(2n) {
    background-color: #F2F6FC;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #EBEEF5;
  }

</style>
