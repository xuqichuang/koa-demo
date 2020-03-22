module.exports = {
  // 生产环境 prod
  environment : 'dev',
  database:{
    dbName: 'costume_design',
    host: '39.107.74.165',
    port: 3306,
    user: 'root',
    password: 'xumanling'
  },
  security:{
    secretKey: 'abcdefg', // 通常情况下要非常复杂，并且要没有任何规律
    expiresIn: 60 * 60 * 24, //令牌的过期时间
  },
  wx:{
    appId: 'wxaf0afc86384ccd99',
    appSecret: '7ba3d9a3b9a08ac9bce94857acd90cc8'
  },
  host: 'http://localhost:3000/'
}