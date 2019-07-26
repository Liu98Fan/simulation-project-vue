import Mock from 'mockjs'
const Random = Mock.Random

let classId = 'abcdefg'
let className = '测试班级001'
let schoolName = '测试学校001'
export const user = (identity)=> {
    let data = JSON.parse(identity.body)
    // console.log(identity.type)
    let result =  {
        'id':Random.guid(),
        'name':Random.cname(),
        'age':Random.integer(16,25),
        'email':Random.email(),
        'classId':classId,
        'className':className,
        'school':schoolName,
        'identity':data.identity,

    }
    result.image=Random.image('100x100', '#02adea', "headImage")
    return result
}
