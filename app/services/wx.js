const util = require('util')
const axios = require('axios')

const {User} = require('../models/user')
const {generateToken} = require('../../core/util')
const {Auth} = require('../../middlewares/auth')
class WXManger{
  static async codeToToken(code){
    // 普通的登录需要 email password 账号密码
    // 小程序这样的 只需要 code码，前端小程序生成，发送到后端，后端调用微信提供的服务
    // code码是合法的话，微信的服务端将返回用户的唯一标识 openId

    // 小程序登录的流程没有显示注册的流程，小程序天生有一个唯一标识：openid，普通的登录流程需要显示用户登录注册，不注册的话没办法获取到用户的唯一标识
    // 后台登录需要传递三个参数： code，appId，appSecret
    // appId 和 appSecret 每个小程序都是固定的， code是动态生成的，

    const url = util.format(
      global.wx.loginUrl,
      global.wx.appId,
      global.wx.appSecret,
      code
    )
    const result = await axios.get(url)
    if(result.status !== 200){
      throw new global.errs.AuthFailed('openid获取失败')
    }
    const errcode = result.data.errcode
    if(errcode !== 0){
      throw new global.errs.AuthFailed('openid获取失败' + errcode)
    }
    let user = await User.getUserByOpenid(result.data.openid)
    if(!user){
      user = await User.registerByOpenid(result.data.openid)
    }
    return generateToken(user.id, Auth.USER)
  }
}

module.exports = {
  WXManger
}