const utils = require('../utils/utils')
const { WARP, GET, POST } = require('../core/routerLoader')

const check_a = async (ctx, next) => {
  const a = ctx.request.query.a
  ctx.assert(a, 400, 'a not null ', { code: 1000 })
  next()
}
class demo {
  // 当autoLoad为true时, 才会自动加载路由
  static autoLoad = true

  // get请求
  @GET()
  async hello(ctx, next) {
    const a = ctx.request.query.a
    ctx.body = { a }
  }

  // post请求
  @POST()
  async helloPost(ctx, next) {
    const a = ctx.request.body.a
    ctx.body = {
      a,
    }
  }

  // 修改路径名称
  @GET('/helloWorld')
  async hello2(ctx, next) {
    ctx.body = 'hello world'
  }

  // 抛出异常
  @GET()
  async error(ctx, next) {
    ctx.throw(501, '你得到了一个错误', { code: 1000 })
  }

  @GET()
  async longTime(ctx, next) {
    console.log('start')
    await utils.sleep(3000)
    console.log('end')

    ctx.body = '3000ms'
  }

  // 忽略response格式化, 用于返回文件
  @GET()
  async ignoreFormatting(ctx, next) {
    ctx.state.ignoreFormatting = true
    ctx.body = 'ignore response formatting'
  }

  // 添加warp
  @WARP(check_a)
  @GET()
  async check(ctx, next) {
    ctx.body = {
      username: '骨傲天',
      age: 30,
    }
  }
}

module.exports = demo
