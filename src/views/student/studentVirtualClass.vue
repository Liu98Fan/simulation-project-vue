<template>
    <div>
        virtualclass+{{classId}}+{{user.id}}
        <video id="remoteVideo" ref="remoteVideo" autoplay="autoplay"></video>
        <button @click="socket.close()">关闭socket</button>
        <button @click="fullScreen">全屏</button>
        <button @click="exitFullscreen">退出全屏</button>
        <div>
            <ul>
                <li v-for="(item,index) in logList" :key="index" v-html="item"></li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import {getStudentList} from "../../util/api";

    export default {
        data(){
            return {
                classId:this.$route.params.classId,
                socket:null,
                remoteVideo: null,
                pc:null,
                log:'',
                logList: [],
                ip:'192.168.0.105',
                toId:'',
                studentList:[],
                teacherList:[],
                chatLog:'',
            }
        },
        mounted() {
            //初始化时建立websocket连接   192.168.20.101
            this.remoteVideo = document.querySelector('video');
            if(this.socket === null)
                this.createWebSocket()
        },
        methods: {
            createWebSocket() {
                this.socket = new WebSocket(`ws://${this.ip}:8083/virtualClass/${this.classId}/${this.user.identity}/${this.user.id}`)
                this.socket.onopen = this.onOpen
                this.socket.onclose = this.onClose
                this.socket.onmessage = this.onMessage
                this.socket.onerror = this.onError
            },
            onOpen() {
                //webSocket建立的回调函数
                this.$message({'message': 'webSocket连接成功', type: 'success'})
                this.log = "webSocket连接成功,连接地址:" + `ws://${this.ip}:8083/virtualClass/${this.classId}/${this.user.identity}/${this.user.id}`

            },
            onMessage(message) {
                if (this.pc === null)
                    this.createPeerConnection()
                let data = message.data
                data = JSON.parse(data)
                // this.log = "收到消息:"+message.data.toString() + "|||type="+data.type+this.user.id
                this.toId = data.userId
                if (data.data.type == "offer") {
                    this.pc.setRemoteDescription(new RTCSessionDescription(data.data))
                    this.pc.createAnswer(this.setLocalDescription, (error) => {
                        console.log(error)
                    })
                } else if (data.data.type == "answer") {
                    this.pc.setRemoteDescription(new RTCSessionDescription(data.data));
                } else if (data.data.type == "candidate") {
                    let candidate = new RTCIceCandidate({
                        sdpMLineIndex: data.data.sdpMLineIndex,
                        candidate: data.data.candidate
                    });
                    this.pc.addIceCandidate(candidate);
                } else if (data.data.type === "online") {
                    this.$message({
                        message: (data.data["object-identity"] === "student" ? "学生" : "老师") + data.data["object-userId"] + "上线了",
                        type: "info"
                    })
                    this.log = (data.data["object-identity"] === "student" ? "学生" : "老师") + data.data["object-userId"] + "上线了"
                    let exist = false
                    if (data.data["object-identity"] === "student") {
                        this.studentList.some(item => {
                            if (item.userId === data.data["object-userId"]) {
                                exist = true
                                return true
                            }
                        })
                        if (!exist) {
                            this.studentList.push({
                                userId: data.data["object-userId"],
                                identity: data.data["object-identity"],
                                virtualClassId: this.classId
                            })
                        }
                    } else {
                        this.teacherList.some(item => {
                            if (item.userId === data.data["object-userId"]) {
                                exist = true
                                return true
                            }
                        })
                        if (!exist) {
                            this.teacherList.push({
                                userId: data.data["object-userId"],
                                identity: data.data["object-identity"],
                                virtualClassId: this.classId
                            })
                        }
                    }
                } else if (data.data.type === "offline") {
                    this.$message({
                        message: (data.data["object-identity"] === "student" ? "学生" : "老师") + data.data["object-userId"] + "下线了",
                        type: "info"
                    })
                    this.log = (data.data["object-identity"] === "student" ? "学生" : "老师") + data.data["object-userId"] + "下线了"
                    this.studentList.some((item, index) => {
                        if (item.userId === data.data["object-userId"]) {
                            this.studentList.splice(index, 1)
                            return true
                        }
                    })

                } else if (data.data.type === "chat"){
                    this.chatLog = data.userId.split("-")[0]+"："+data.data.message
                }
            },
            onClose() {
                this.$message({'message': 'webSocket已关闭', type: 'warning'})
                this.log = "webSocket连接关闭"
            },
            onError() {
                this.$message.error("websocket连接错误")
                this.log = "webSocket连接错误"
            },
            sendMessage(json) {
                json = {
                    toId: this.toId,
                    userId: this.user.id,
                    identity: this.user.identity,
                    virtualClassId: this.classId,
                    data: json
                }
                let jsonstr = JSON.stringify(json)
                if (this.socket !== null) {
                    this.socket.send(jsonstr)
                    // this.log = "发送消息:"+jsonstr;
                } else {
                    this.message.error("websocket发送消息失败")
                }
            },
            setLocalDescription(sessionDescription) {
                // this.log = "设置本地描述:"+sessionDescription
                this.pc.setLocalDescription(sessionDescription)
                //获取远程描述
                // let command = {type:'getDescription',user:this.user,identifier:'teacher',description:sessionDescription}
                this.sendMessage(sessionDescription)
            },
            createPeerConnection() {
                this.log = "开始建立RTC对等连接..."
                if (this.pc === null) {
                    let serveInfo = {
                        'iceServers': [
                            {
                                'urls': 'turn:numb.viagenie.ca',
                                'username': 'muazkh',
                                'credential': 'webrtc@live.com'
                            },

                            {
                                'urls': 'stun:stun.l.google.com:19302'
                            }
                        ],
                    }
                    this.pc = new RTCPeerConnection(serveInfo)
                    this.pc.onicecandidate = this.onIceCandidate
                    this.pc.onaddstream = this.onRemoteStreamAdded
                    this.pc.onremovestream = this.onRemoteStreamRemoved
                }

            },
            onIceCandidate(e) {
                if (e.candidate) {
                    this.sendMessage(
                        {
                            type: 'candidate',
                            sdpMLineIndex: e.candidate.sdpMLineIndex,
                            candidate: e.candidate.candidate

                        }
                    )
                } else {
                    console.log("End of candidates.");
                    this.log = "***************************验证完成****************************"
                }
            },
            onRemoteStreamAdded(e) {
                this.remoteVideo.srcObject = e.stream
            },
            onRemoteStreamRemoved() {
            },
            //进入全屏
            fullScreen() {
                let ele = document.querySelector("video");
                if (ele.requestFullscreen) {
                    ele.requestFullscreen();
                } else if (ele.mozRequestFullScreen) {
                    ele.mozRequestFullScreen();
                } else if (ele.webkitRequestFullScreen) {
                    ele.webkitRequestFullScreen();
                }
            },
            //退出全屏
            exitFullscreen() {
                let de = document.querySelector("video");
                if (de.exitFullscreen) {
                    de.exitFullscreen();
                } else if (de.mozCancelFullScreen) {
                    de.mozCancelFullScreen();
                } else if (de.webkitCancelFullScreen) {
                    de.webkitCancelFullScreen();
                }
            },
            getDate(){
                let date = new Date()
                return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}  ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
            },
        },
        computed:{
            ...mapState(['user']),


        },
        watch:{
            log:function(newVal){
                this.logList.push(this.getDate()+"-------------"+newVal)
            },
            chatLog:function(newVar){
                let str = "<br><span style='color:darkgrey;font-size: 10px'>"+this.getDate()+"</span><br><span style='color:blueviolet'>"+newVar+"</span>"
                this.logList.push(str)
            }
        }
    }
</script>

<style scoped>

</style>
