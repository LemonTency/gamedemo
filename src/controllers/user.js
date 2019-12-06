const { ROUTER, GET, POST } = require('../core/routerLoader')

const chech_a = async (ctx, next) => {
  const a = ctx.request.query.a
  ctx.assert(a, 400, 'a not null ', { code: 1000 })
  next()
}

// 修改路径名称
@ROUTER('/user2')
class user {
  static autoLoad = true

  @GET()
  async getUser(ctx, next) {
    ctx.body = {
      username: '骨傲天',
      age: 30,
    }
  }
}

module.exports = user
