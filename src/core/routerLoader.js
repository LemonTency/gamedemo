/**
 * 路由loader
 * loader将自动加载controllers文件夹下的路由
 */

const glob = require('glob')
const path = require('path')

const routerLoader = {}
let router

routerLoader.init = function(params) {
  const dir = path.join(__dirname, '../controllers')
  router = require('koa-router')({
    prefix: params.prefix,
  })

  const files = glob.sync(dir + '/*.js')

  for (const file of files) {
    const name = path.basename(file, '.js')
    const clazz = require(`../controllers/${name}`)
    if (!clazz.autoLoad) continue

    const tmpRouter = require('koa-router')()

    // console.log(
    //   'clazz:',
    //   clazz.name,
    //   clazz.prototype._routePath,
    //   clazz.prototype._routes,
    // )

    const methods = Object.getOwnPropertyDescriptors(clazz.prototype)
    for (let methodName in methods) {
      if (methodName.startsWith('_') || methodName === 'constructor') continue

      const options = clazz.prototype._routes[methodName]
      if (!options) continue
      // console.log('options:', options)

      const fn = methods[methodName].value
      const warps = clazz.prototype._routes[methodName]._warps

      if (warps && warps.length > 0) {
        tmpRouter[options.method](options.path, ...warps, fn)
      } else {
        tmpRouter[options.method](options.path, fn)
      }
    }

    const _routePath = clazz.prototype._routePath
      ? clazz.prototype._routePath
      : `/${name}`
    router.use(_routePath, tmpRouter.routes(), tmpRouter.allowedMethods())
  }

  router.all('*', async (ctx, next) => {
    ctx.status = 404
  })

  return router
}

const request = (method = 'get', path = '') => (target, name, descriptor) => {
  !target._routes && (target._routes = {})
  !target._routes[name] && (target._routes[name] = {})

  target._routes[name].method = method
  target._routes[name].path = !!path ? `${path}` : `/${name}`

  return descriptor
}

const GET = path => request('get', path)
const POST = path => request('post', path)
const PUT = path => request('put', path)
const DELETE = path => request('delete', path)
const ALL = path => request('all', path)
const HEAD = path => request('head', path)
const OPTIONS = path => request('options', path)
const PATCH = path => request('patch', path)

const ROUTER = path => target => {
  path && (target.prototype._routePath = path)
}

const WARP = fn => (target, name, descriptor) => {
  !target._routes && (target._routes = {})
  !target._routes[name] && (target._routes[name] = {})
  !target._routes[name]._warps && (target._routes[name]._warps = [])

  target._routes[name]._warps.push(fn)

  return descriptor
}

module.exports = {
  routerLoader,
  ROUTER,
  WARP,
  GET,
  POST,
  PUT,
  DELETE,
  ALL,
  HEAD,
  OPTIONS,
  PATCH,
}
