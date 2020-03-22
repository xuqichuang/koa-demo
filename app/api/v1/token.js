const Router = require('koa-router')
const {TokenValidator} = require('../../validator/validator')
const {LoginType} = require('../../lib/enum')
const {User} = require('../../models/user')
const { Auth } =require('../../../middlewares/auth')
const { success } = require('../../lib/helper')
const { generateToken } = require('../../../core/util')
const { WXManger } = require('../../services/wx')

const router = new Router({
  prefix: '/v1/token'
})


router.post('/', async (ctx)=>{
  
  const v = await new TokenValidator().validate(ctx)
  let token;
  switch (v.get('body.type')){
    case LoginType.USER_EMAIL:
        token = await emailLogin(v.get('body.account'), v.get('body.secret'))
      break;
    case LoginType.USER_MINI_PROGRAM:
        token = await WXManger.codeToToken(v.get('body.account'))
      break;
    case LoginType.ADMIN_EMAIL:
      break;
    default:
      throw new global.errs.ParameterException('没有相应的处理函数')
  }
  ctx.body = {
    token
  }
})

async function emailLogin(account, secret){
  const user = await User.verifyEmailPassword(account, secret)
  //scope 8: 普通用户， 16 管理员
  return generateToken(user.id, Auth.USER)
}
module.exports = router