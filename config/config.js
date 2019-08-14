module.exports = {
  // 生产环境 prod
  environment : 'dev',
  database:{
    dbName: 'lucky_star',
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '123456'
  },
  security:{
    secretKey: 'abcdefg', // 通常情况下要非常复杂，并且要没有任何规律
    expiresIn: 60 * 60 * 24, //令牌的过期时间
  }
}