# KoaWheel

#### 作业说明
很尴尬，因为自己时间不足够没法完整的完成作业，本来mysql也已经建好表了，奈何弄不懂orm，最后仓促上交

todo: 
1. 继续搭建docker环境，用真表进行增删改查。
2. 将对应的controller，service进行一一分类，不耦合
3. 封装组件
4. 用docker打包镜像进行部署
5. 错误处理



# 模块说明

## Controller

负责解析用户的输入，处理后返回相应的结果，例如

- 在 RESTful 接口中，Controller 接受用户的参数，从数据库中查找内容返回给用户或者将用户的请求更新到数据库中。
- 在 HTML 页面请求中，Controller 根据用户访问不同的 URL，渲染不同的模板得到 HTML 返回给用户。
- 在代理服务器中，Controller 将用户的请求转发到其他服务器上，并将其他服务器的处理结果返回给用户。

框架推荐 Controller 层主要对用户的请求参数进行处理（校验、转换），然后调用对应的 service 方法处理业务，得到业务结果后封装并返回：

1. 获取用户通过 HTTP 传递过来的请求参数。
2. 校验、组装参数。
3. 调用 Service 进行业务处理，必要时处理转换 Service 的返回结果，让它适应用户的需求。
4. 通过 HTTP 将结果响应给用户。

## Service

在复杂业务场景下用于做业务逻辑封装的一个抽象层，提供这个抽象有以下几个好处：

保持 Controller 中的逻辑更加简洁。
保持业务逻辑的独立性，抽象出来的 Service 可以被多个 Controller 重复调用。
将逻辑和展现分离，更容易编写测试用例，测试用例的编写具体可以查看这里。

### 使用场景

- 复杂数据的处理，比如要展现的信息需要从数据库获取，还要经过一定的规则计算，才能返回用户显示。或者计算完成后，更新到数据库。
- 第三方服务的调用，比如 GitHub 信息获取等。

# scripts

```
[NODE_ENV=(环境名))] npm run (脚本名) [-- (应用参数)]

环境: development(缩写 dev), local, sit, production(缩写 prod)
默认是 development 环境

example:
本地环境下运行 start
NODE_ENV=local npm run start

npm run start // 直接启动应用
npm run debug // 使用 nodemon 启动应用, 此时会监听文件的变化, 一旦发现文件有改动, Nodemon 会自动重启应用. 一般用于开发环境
npm run stop // 杀死node进程

npm run pm2 // 使用 pm2 启动应用, 当应用死掉时, pm2 会自动重启应用. 一般用于生产环境
本项目的 pm2 采用的是 ecosystem.config 配置方式调用 pm2, 因此设置环境需要用其制定的方式,
npm run pm2 [-- --env 环境名]
pm2 kill // 停止pm2
example:
生产环境下使用 pm2 启动应用
npm run pm2 -- --env prod

npm run doc // 使用 apidoc 扫描目录(/src/controllers), 生成接口文档到目录(/doc)

npm run resetDB // 使用 sequelize 扫描目录(/src/models), 在数据库中创建对映的表. 该操作会清除所有数据.

npm run test // 调用目录(test)中的测试代码

npm run deploy // 部署到特定服务器
example:
npm run deploy -- -u http://username:password@host:22/path
```
