/*
通过mutation间接更新state的多个方法的对象
 */

import {UPDATE_USER} from "./mutation-types";
export default {
  updateUser({commit},object){
    commit(UPDATE_USER,object)
  },

}
