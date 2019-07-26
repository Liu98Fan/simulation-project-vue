<template>
    <div>
        <el-container style=" border: 1px solid ;height: 1200px">

            <el-container>
                <el-header>
                    <h1 style="text-align: center">{{`课堂:${classId}  用户:${user.id}  身份:${user.identity}`}}</h1>
                </el-header>
                <el-main>
                    <el-button type="primary" plain @click="sharingScreen">屏幕分享</el-button>
                    <el-button type="primary" plain @click="closeSharingScreen">关闭屏幕分享</el-button>
                    <el-button type="primary" plain @click="socket.close()">关闭连接</el-button>
                    <el-button type="primary" plain @click="createWebSocket">websocket连接</el-button>

                    <el-tabs type="border-card" style="margin-top: 10px;">
                        <el-tab-pane label="课堂状态">
                            <el-collapse >
                                <el-collapse-item>
                                    <template slot="title">
                                        教师用户<el-tag type="success">在线数:{{teacherList.length}}</el-tag>
                                    </template>
                                    <el-row>
                                        <el-col v-for="item in teacherList" :key="item.userId" :span="6"  style="padding-right: 5px;">
                                            <el-card  style="text-align: center;">
                                                <img :src="deskImage" class="image" style="width: 150px">
                                                <div style="padding: 14px;">
                                                    <span>{{item.userId.split("-")[0]}}</span>
                                                    <div class="bottom clearfix">
                                                        <el-badge value="本机" class="item" v-if="item.userId === user.id" style="margin: 5px 0px">
                                                            <el-tag type="success">在线</el-tag>
                                                        </el-badge>
                                                        <el-tag type="success" v-else style="margin: 5px 0px">在线</el-tag>
                                                        <br>
                                                        <el-button type="primary" round :disabled="confirmConnect(item.userId)">{{confirmConnect(item.userId)?'已连接':'连接'}}</el-button>
                                                    </div>
                                                </div>
                                            </el-card>
                                        </el-col>
                                    </el-row>
                                </el-collapse-item>
                                <el-collapse-item >
                                    <template slot="title">
                                        学生用户<el-tag type="success">在线数:{{studentList.length}}</el-tag>
                                    </template>
                                    <el-row>
                                        <el-col v-for="item in studentList" :key="item.userId" :span="6" style="padding-right: 5px;">
                                            <el-card  style="text-align: center;">
                                                <img :src="deskImage" class="image" style="width: 150px">
                                                <div style="padding: 14px;">
                                                    <span>{{item.userId.split("-")[0]}}</span>
                                                    <div class="bottom clearfix">
                                                        <el-tag type="success" style="margin: 5px 0px">在线</el-tag>
                                                        <br>
                                                        <el-button type="primary" round :disabled="confirmConnect(item.userId)">{{confirmConnect(item.userId)?'已连接':'连接'}}</el-button>
                                                    </div>
                                                </div>
                                            </el-card>
                                        </el-col>
                                    </el-row>
                                </el-collapse-item>

                            </el-collapse>
                        </el-tab-pane>
                        <el-tab-pane label="我的屏幕">
                            <h1 style="text-align: center">我的屏幕</h1>
                            <video id="localVideo" ref="video" autoplay="autoplay" style="border: 1px solid ; width: 100% ;height: 100%;"></video>
                        </el-tab-pane>
                        <el-tab-pane label="学生监控">学生监控</el-tab-pane>
                        <el-tab-pane label="文件传输">文件传输</el-tab-pane>
                    </el-tabs>
                </el-main>
            </el-container>

            <el-aside width="40%" style="background-color: rgb(238, 241, 246);border: 1px solid ;position: relative">
                <h1 style="text-align: center;">课堂消息</h1>
                <div>
                    <ul >
                        <li class="li-item" v-for="(item,index) in logList" :key="index" v-html="item"></li>
                    </ul>
                </div>
                <div style=" width: 100%; position: absolute;bottom:5px;text-align: center">
                    <el-input placeholder="请输入内容" v-model="message" class="input-with-select" @keydown.enter.native="sendChatMessage">
                        <el-template  slot="prepend" >发送消息:</el-template>
                        <el-button slot="append" icon="el-icon-s-promotion" @click="sendChatMessage"></el-button>
                    </el-input>
                </div>
            </el-aside>
        </el-container>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import {getStudentList,getVirtualClassInfo} from "../../util/api";

    export default {
        data(){
            return {
                deskImage:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563875992178&di=8d0631dfdba4a1f1de93877701521108&imgtype=0&src=http%3A%2F%2Ftaisy0.com%2Fwp-content%2Fuploads%2F2014%2F10%2Fwindows10logo.jpg',
                classId:this.$route.params.classId,
                socket:null,
                video:null,
                pc:null,
                remoteVideo:null,
                connectCount:0,
                log:'',
                chatLog:'',
                logList:[],
                ip:'localhost',
                pcList:[],
                localSessionDescription:null,
                studentList:[],
                teacherList:[],
                screenStream:null,
                message:'',
            }
        },
        mounted() {
            //初始化时建立websocket连接
            this.video = document.querySelector('video');
            if(this.socket === null)
                this.createWebSocket()
            //查询在线人员信息
            this.getvirtualClassInfo()
        },
        methods:{
            createWebSocket(){
                this.socket = new WebSocket(`ws://${this.ip}:8083/virtualClass/${this.classId}/${this.user.identity}/${this.user.id}`)
                this.socket.onopen = this.onOpen
                this.socket.onclose = this.onClose
                this.socket.onmessage = this.onMessage
                this.socket.onerror = this.onError
            },
            onOpen(){
                //webSocket建立的回调函数
                this.$message({'message':'webSocket连接成功',type:'success'})
                this.log = "webSocket连接成功,连接地址:"+`ws://${this.ip}:8083/virtualClass/${this.classId}/${this.user.identity}/${this.user.id}`
            },
            onMessage(message){
                let data = message.data
                data = JSON.parse(data)
                // this.log = "收到消息:"+message.data.toString()
                //首先获得发送者的ID
                let userId = data.userId
                let exist = false
                this.pcList.some(item=>{
                    if(item.userId === userId){
                        // console.log("存在这个人："+userId+"，type:"+data.data.type)
                        exist = true
                        let pc = item.pc
                        // if(data.data.type=="offer"){
                        //     pc.setRemoteDescription(new RTCSessionDescription(data.data))
                        //     pc.createAnswer(this.setLocalDescription,(error)=>{console.log(error)})
                        // }else
                        if (data.data.type == "answer" ) {
                            // console.log("收到"+userId+"的answer")
                            pc.setRemoteDescription(new RTCSessionDescription(data.data));
                        } else if (data.data.type == "candidate" ) {
                            let candidate = new RTCIceCandidate({
                                sdpMLineIndex : data.data.sdpMLineIndex,
                                candidate : data.data.candidate
                            });
                            pc.addIceCandidate(candidate);
                        } else if(data.data.type ==="online"){
                            this.$message({
                                message:(data.data["object-identity"]==="student"?"学生":"老师")+data.data["object-userId"]+"上线了",
                                type:"info"
                            })
                            this.log = (data.data["object-identity"]==="student"?"学生":"老师")+data.data["object-userId"]+"上线了"
                            let exist = false
                            if(data.data["object-identity"]==="student"){
                                this.studentList.some(item=>{
                                    if(item.userId===data.data["object-userId"]){
                                        exist = true
                                        return true
                                    }
                                })
                                if(!exist){
                                    this.studentList.push({userId:data.data["object-userId"],identity:data.data["object-identity"],virtualClassId:this.classId})
                                }
                            }else{
                                this.teacherList.some(item=>{
                                    if(item.userId===data.data["object-userId"]){
                                        exist = true
                                        return true
                                    }
                                })
                                if(!exist){
                                    this.teacherList.push({userId:data.data["object-userId"],identity:data.data["object-identity"],virtualClassId:this.classId})
                                }
                            }
                        } else if (data.data.type === "offline"){
                            this.$message({
                                message:(data.data["object-identity"]==="student"?"学生":"老师")+data.data["object-userId"]+"下线了",
                                type:"info"
                            })
                            this.log = (data.data["object-identity"]==="student"?"学生":"老师")+data.data["object-userId"]+"下线了"
                            this.studentList.some((item,index)=>{
                                if(item.userId === data.data["object-userId"]){
                                    this.studentList.splice(index,1)
                                    return true
                                }
                            })

                        } else if (data.data.type === "chat"){
                            this.chatLog = data.userId.split("-")[0]+"："+data.data.message
                        }
                    }
                })
                if(!exist){
                    //不存在这个人，将连接加入list
                    console.log("不存在这个人，将连接加入list"+userId)
                    this.pcList.push({userId,virtualClassId:this.classId,pc:new RTCPeerConnection()})
                    this.onMessage(message)

                }
            },
            onClose(){
                this.$message({'message':'webSocket已关闭',type:'warning'})
                this.log = "webSocket连接关闭"
                this.socket = null
            },
            onError(){
                this.$message.error("websocket连接错误")
                this.log = "webSocket连接错误"
            },
            sendMessage(json,toId){
                json = {toId,userId:this.user.id,identity:this.user.identity,virtualClassId:this.classId,data:json}
                let jsonstr = JSON.stringify(json)
                if(this.socket!==null){
                    this.socket.send(jsonstr)
                    // this.log = "websocket发送消息:"+jsonstr
                }else{
                    this.message.error("websocket发送消息失败")
                }
            },
            sharingScreen(){
                //获取学生列表
                //获取自身屏幕流
                //点到多点需要创建多个peerconnection

                this.log = "开始获取屏幕流..."
                if ('getDisplayMedia' in navigator.mediaDevices) {
                    navigator.mediaDevices.getDisplayMedia({video:true}).then(stream => {
                        // we have a stream, attach it to a feedback video element
                        this.video.srcObject = stream
                        this.log = "获取屏幕流成功"
                        this.screenStream = stream

                        getStudentList(this.classId).then(res=>{
                            this.studentList = res.data.data
                            this.doRTCConnection()
                        }).catch(error=>{
                            this.$message.error("获取学生列表出错")
                            console.log(error)
                        }).finally(()=>{

                        })
                        console.log(this.pcList)
                    }, error => {
                        this.$message.error("无法捕捉屏幕，请稍后重试")
                        this.log = "获取屏幕流失败..."
                        console.log(error)
                    });
                } else {
                    // fall back to extension way
                    this.$message.error("抱歉，您的浏览器不支持屏幕分享，建议使用新版chrome浏览器重试。")
                    this.log = "抱歉，您的浏览器不支持屏幕分享，建议使用新版chrome浏览器重试。"
                }


            },
            //教师机与学生机连接
            doRTCConnection(){
              //遍历studentList
                this.log = "开始与学生建立RTC连接，共上线"+this.studentList.length+"个学生"
                this.studentList.some(student=>{
                    //与单个学生进行连接
                    let pc = this.createPeerConnection(student.userId);
                    console.log(this.screenStream)
                    pc.addStream(this.screenStream)
                    let pcItem = {userId:student.userId,identity:student.identity,virtualClassId:this.classId,pc,}
                    this.pcList.push(pcItem)
                    this.createChannal(pcItem)
                })
            },
            //建立对等连接
            createPeerConnection(){
                this.log = "开始建立第"+(++this.connectCount)+"个WEBRTC对等连接..."
                // console.log("开始建立第"+(++this.connectCount)+"个RTC对等连接...")
                let serveInfo = {'iceServers': [
                        {
                          'urls': 'turn:numb.viagenie.ca',
                          'username': 'muazkh',
                          'credential': 'webrtc@live.com'
                        },

                        {
                          'urls': 'stun:stun.l.google.com:19302'
                        }
                    ], mandatory: {
                        OfferToReceiveVideo: true
                    }
                }
                let pc = new RTCPeerConnection(serveInfo)
                pc.onicecandidate = this.onIceCandidate
                pc.ontrack = this.onRemoteStreamAdded
                pc.onremovestream = this.onRemoteStreamRemoved
                this.pc = pc
                return pc
            },
            //建立对等信道
            createChannal(pcItem){
                let pc = pcItem.pc

                pc.createOffer().then(sessionDescription=>{
                    // this.log = "设置和"+pcItem.userId+"连接的本地描述:"+sessionDescription
                    // console.log("设置和"+pcItem.userId+"连接的本地描述:"+sessionDescription)
                    this.pc.setLocalDescription(sessionDescription)
                    pc.setLocalDescription(sessionDescription).then(()=>{
                        this.sendMessage(sessionDescription,pcItem.userId)
                    }).catch(error=>{
                        console.log(error)
                    })
                }).catch(error=>{
                    // this.log = "发送offer失败"
                    console.log(error)
                })
                console.log(pc)
            },
            onIceCandidate(e){
                if (e.candidate) {
                    // this.log = "candidate验证开始"
                    this.sendMessage({
                            type: 'candidate',
                            sdpMLineIndex: e.candidate.sdpMLineIndex,
                            candidate: e.candidate.candidate
                    },'all')
                }else {
                    // this.log = "candidate验证完成"
                }
            },
            onRemoteStreamAdded(e){
                this.remoteVideo.srcObject = e.stream
            },
            onRemoteStreamRemoved(){},
            getDate(){
                let date = new Date()
                return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}  ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
            },
            getvirtualClassInfo(){
                getVirtualClassInfo(this.classId).then(res=>{
                    let data = res.data

                    if(data.code === 200 ){
                        data = data.data
                        this.studentList = data.studentList
                        this.teacherList = data.teacherList
                        //检查一下有没有自己
                        let exist = false
                        this.teacherList.some(item=>{
                            if(item.userId===this.user.id){
                                exist = true
                            }
                        })
                        if(!exist){
                            //不存在
                            this.teacherList.push({userId:this.user.id,identity:this.user.identity,virtualClassId:this.classId})
                        }
                    }else{
                        this.$message.error(data.msg)
                    }
                }).catch(error=>{
                    this.$message.error("网络连接失败")
                    console.log(error.toString())
                })
            },
            sendChatMessage(){
                if(this.message.length>0){
                    this.sendMessage({message:this.message,type:'chat'},"all")
                    this.chatLog = "我:"+this.message
                }
                this.message = ''

            }
        },
        watch:{
            log:function(newVar){
                this.logList.push(this.getDate()+"-------------"+newVar)
            },
            chatLog:function(newVar){
                let str = "<br><span style='color:darkgrey;font-size: 10px'>"+this.getDate()+"</span><br><span style='color:blueviolet'>"+newVar+"</span>"
                this.logList.push(str)
            }
        },
        computed:{
            ...mapState(['user']),
            confirmConnect(){
                return function (userId) {
                    let result = false
                    this.pcList.some(item=>{
                        if(item.userId===userId){
                            result = true
                            return true
                        }
                    })
                    return result
                }
            }

        }
    }
</script>

<style scoped>
    .li-item{
        list-style: square inside;
        color:darkgrey;
    }
</style>
