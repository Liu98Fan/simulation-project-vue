import Mock from 'mockjs'
import {user} from "./mockData";

Mock.setup({timeout:1000})

Mock.mock(/^\/mock\/user\/login*/,'post',user)

export default Mock
