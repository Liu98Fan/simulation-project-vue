/*
直接更新state的多个方法的对象
 */
import {
  UPDATE_USER
} from './mutation-types'

export default {
  [UPDATE_USER](state,user){
    state.user = user
    localStorage.setItem("user",JSON.stringify(user))
  }
}
