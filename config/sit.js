/**
 * sit环境的配置内容
 */

module.exports = {
  // 环境名称
  env: 'sit',
  // 服务端口号
  port: 8080,

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
    url: '',
    port: 8080,
    password: '',
  },
}
