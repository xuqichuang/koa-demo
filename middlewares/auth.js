const basicAuth = require('basic-auth') 
// 生成 jwt令牌
const jwt = require('jsonwebtoken');

class Auth {
  constructor(lever=1){
    // lever 用户权限等级 
    this.lever = lever
    Auth.USER = 8
    Auth.Admin = 16
    Auth.SUPER_ADMIN = 32
  }

  get m(){
    return async (ctx, next)=>{
      // ctx.req  =>  nodejs 返回的request
      // ctx.request  =>  koa 返回的封装过后的request
      const userToken = basicAuth(ctx.req)
      let errMsg = 'token不合法'
      // 是否为空初级判断
      if(!userToken || !userToken.name){
        throw new global.errs.Forbbiden(errMsg)
      }
      try {
        var decode = jwt.verify(userToken.name,global.config.security.secretKey)
      } catch (error) {
        // token 不合法
        // token 过期
        if(error.name == 'TokenExpiredError'){
          errMsg = 'token已过期'
        }
        throw new global.errs.Forbbiden(errMsg)
      }
      if(decode.scope < this.lever){
        errMsg = '用户权限不足'
        throw new global.errs.Forbbiden(errMsg)
      }
      // 之前放置了 uid, scope
      // 自定义 ctx.auth, 放置 uid和scope
      ctx.auth = {
        uid: decode.name,
        scope: decode.scope
      }

      await next()
    }
  }
}

module.exports = {
  Auth
}