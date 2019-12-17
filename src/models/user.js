//用户表
const users = [
    {id:1,name:'tency',password:123},
    {id:2,name:'darren',password:123},
]

//角色表
const actor = [
    {id:1,nickname:'黎仙儿',level:1},
    {id:2,nickname:'裴元然',level:2},
    {id:3,nickname:'霞公主',level:3},
    {id:4,nickname:'雨帅',level:3},
]

//用户和角色映射表
const user_actor = [
    {user_id:1,actor_id:1},
    {user_id:1,actor_id:2},
    {user_id:2,actor_id:3},
]

//门派列表
const org = [
    {id:1,org_name: '照阳山'},
    {id:2,org_name: '天海阁'},
    {id:3,org_name: '神农门'},
]

//角色门派列表
const org_actor = [
    {actor_id:1,org: '照阳山',role_name: '弟子'},
    {actor_id:2,org: '照阳山',role_name: '掌门'},
    {actor_id:3,org: '神农门',role_name: '弟子'},
]

const actor_treasure = [
    {treasure_id: 1,actor_id:1},
    {treasure_id: 2,actor_id:1},
    {treasure_id: 3,actor_id:2},
    {treasure_id: 4,actor_id:3},
]

const treasure = [
    {id:1,name:'宝塔',skill:['哦里给','动感光波']},
    {id:2,name:'锤子',skill:['漂漂锤','春风十里']},
    {id:3,name:'钉耙',skill:['含笑半步癫']},
    {id:3,name:'小刀',skill:['小李飞刀']}
]


module.exports = {
    users,
    actor,
    user_actor,
    org_actor,
    org,
    actor_treasure,
    treasure
  }
  