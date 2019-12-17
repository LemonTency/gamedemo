const { ROUTER, GET, POST } = require('../core/routerLoader')
const {users,actor,user_actor,org,org_actor,treasure,actor_treasure }  = require('../models/user')

const chech_a = async (ctx, next) => {
  const a = ctx.request.query.a
  ctx.assert(a, 400, 'a not null ', { code: 1000 })
  next()
}


// 修改路径名称
class user {
  static autoLoad = true

  /**
   * 
   * @api {post} /api/user/login 登陆接口
   * @apiParam {string} name 用户名称 tency
   * @apiParam {string} password 用户密码 123
   * @apiSuccess {String} data 登陆结果
   * @apiSuccessExample Success-Response:
   * {
   *  "timestamp": 1576571733715,
   *  "success": true,
   *  "data": "登陆成功"
   * }
   */
  @POST()
  async login(ctx, next) {
    const name = ctx.request.body.name
    const password = ctx.request.body.password
    const params = users.filter(item => item.name === name)
    if(params[0].password == password){
      ctx.response.status = 200
      ctx.response.body = '登陆成功'
    }else{
      ctx.response.errormassger = '密码错误'
    }
  }

  /**
   * 
   * @api {get} /api/user/getRole 获取当前用户对应的角色列表
   * @apiSuccessExample Success-Response:
   * {
   *  "timestamp": 1576572003188,
   *  "success": true,
   *  "data": [
   *   {
   *     "id": 1,
   *     "nickname": "黎仙儿",
   *     "level": 1
   *   },
   *   {
   *     "id": 2,
   *     "nickname": "裴元然",
   *     "level": 2
   *   }
   *  ]
   * }
   */
  @GET()
  async getRole(ctx, next) {
    //根据name 再去查id，然后查到对应的角色
    const name = ctx.request.body.name
    const params = users.filter(item => item.name === name)
    //没做容错
    const id = params[0].id
    //筛选出当前id对应的角色
    const params2 = user_actor.filter(item => item.user_id === id)  
    const roleArr = []
    for(let i of params2){
      roleArr.push(i.actor_id)
    }
    const roleList = []
    for(let i in roleArr){
      const tem = actor.filter(item => item.id === roleArr[i])  
      roleList.push(tem[0])
    }
    ctx.response.body = roleList
    ctx.response.status = 200
  }

  /**
   * 
   * @api {get} /api/user/getOrg 获取门派列表
   * @apiParam {string} name 用户名称 tency
   * @apiSuccessExample Success-Response:
   *  {
   *  "timestamp": 1576572406931,
   *  "success": true,
   *  "data": [
   *   {
   *    "id": 1,
   *     "org_name": "照阳山"
   *   },
   *   {
   *     "id": 2,
   *     "org_name": "天海阁"
   *   },
   *   {
   *     "id": 3,
   *     "org_name": "神农门"
   *   }
   *  ]
   *  }
   */

  @GET()
  async getOrg(ctx, next) {
    //获取门派列表
    ctx.response.body = org
    ctx.response.status = 200
  }

  /**
   * 
   * @api {get} /api/user/getActorOrg 获取角色对应门派及在门派中的角色
   * @apiParam {string} id 角色id 2
   * @apiSuccessExample Success-Response:
   * {
   *  "timestamp": 1576572753807,
   *  "success": true,
   *  "data": [
   *   {
   *     "actor_id": 2,
   *     "org": "照阳山",
   *     "role_name": "掌门"
   *   }
   *  ]
   * }
   * 
   */
  @GET()
  async getActorOrg(ctx, next) {
    //根据角色id 查到对应门派及角色
    const actor_id = ctx.request.body.id
    const org = org_actor.filter(item => item.actor_id == actor_id)  
    ctx.response.status = 200
    ctx.response.body = org
  }

  /**
   * 
   * @api {get} /api/user/getTreasure 根据actor_id获取宝物及宝物技能
   * @apiparams {string} id 角色id 2
   * @apiSuccessExample Success-Response:
   * {
   *  "timestamp": 1576572980260,
   *  "success": true,
   *  "data": [
   *   {
   *     "id": 3,
   *     "name": "钉耙",
   *     "skill": [
   *     "含笑半步癫"
   *     ]
   *   }
   * ]
   * }
   */
  @GET()
  async getTreasure(ctx, next) {
    //先根据actor_id找到对应的treasue_id
    const actor_id = ctx.request.body.id
    const temp = actor_treasure.filter(item => item.actor_id == actor_id)  
    //有多少个宝物都遍历，出来根据treasue_id找到对应的宝物名称和对应技能
    const treasureList = []
    for(let i in temp){
      const tem = treasure.filter(item => item.id === temp[i].treasure_id)  
      treasureList.push(tem[0])
    }
    ctx.response.status = 200
    ctx.response.body = treasureList
  }

}
module.exports = user
