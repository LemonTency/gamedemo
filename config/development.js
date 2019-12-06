/**
 * 开发环境的配置内容
 */

module.exports = {
  // 环境名称
  env: 'development',
  // 服务端口号
  port: 3003,

  // 数据库
  mysql: {
    enable: false,
    url: 'localhost',
    user: 'root',
    psw: '123456',
    db_name: 'sloth',
  },

  // redis
  redis: {
    enable: false,
    sentinelsEnable: false,
    // 哨兵
    sentinels: [{ host: '', port: '' }],
    name: '',
    url: '127.0.0.1',
    port: 6379,
    password: '',
  },
}
