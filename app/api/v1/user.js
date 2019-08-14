const Router = require('koa-router')
const {RegisterValidator} = require('../../validator/validator')
const {User} = require('../../models/user')
const { success } = require('../../lib/helper')
const router = new Router({
  prefix: '/v1/user'
})


router.post('/register',
// 中间可以插入中间件形式
// 在这里已中间件形式校验只全局注册的时候实例化一次
// 
 async (ctx)=>{
  //  在这里
  const v = await new RegisterValidator().validate(ctx)
  // 位数越大发费的成本越高
  // 数据库的密码不能以明文形式存储，加密之后的密码也是不同的，防止彩虹攻击

  // 思维方式
  // 接收哪些参数 => 参数校验
  // email password password2
  // API中最好减少校验规则,
  // 储存到数据库中
  // 通过sequelize 进行数据库的操作
  
  const user = {
    email: v.get('body.email'),
    nickname: v.get('body.nickname'),
    password: v.get('body.password2'),
  }
  await User.create(user)
  
  success()
})

module.exports = router