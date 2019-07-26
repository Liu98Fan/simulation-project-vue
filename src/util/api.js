import {get, post,deletes,put} from './axios.js' ;//导入axios实例文件中方法

//根据virtualclassid获取在线学生列表
export const getOnlineStudentByVirtualClassId=(virtualClassId)=>{
    return get(`/virtualClass/getOnlineStudentByVirtualClassId`,{'virtualClassId':virtualClassId}); //resfulapi风格
}

//登陆方法，mock随机的用户信息数据
export const login = (identity)=>{
    return post(`/mock/user/login`,{'identity':identity})
}

//获取课堂的在线学生列表
export const getStudentList = (lessonId)=>{
    return get(`/api/virtualClass/getStudentList`,{'lessonId':lessonId})
}

export const getVirtualClassInfo = (lessonId)=>{
    return get(`/api/virtualClass/getVirtualClassroomInfo`,{'lessonId':lessonId})
}
