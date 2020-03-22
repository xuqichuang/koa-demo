const {LuckyValidator, Rule} = require('../../core/lucky-validator')
const {User} = require('../models/user')
const { LoginType } = require('../lib/enum')

class PositiveIntegerValidator extends LuckyValidator {
  constructor(){
    super()
    this.id = [
      new Rule('isInt','需要正整数',{min:1})
    ]
  }
}

// 验证注册接口
class RegisterValidator extends LuckyValidator {
  constructor(){
    super()
    this.email = [
      new Rule('isEmail','不符合email规范')
    ]
    this.password = [
      // 加强密码
      new Rule('isLength', '最少6个字符，最大21个字符',{
        min: 6,
        max: 32
      }),
      // new Rule('matches','密码过于简单','')
    ]
    this.password2 = this.password
    this.nickname = [
      new Rule('isLength','昵称不符合规范',{
        min:4,
        max:32
      })
    ]
  }

  validatePassword(vals){
    const psw = vals.body.password
    const psw2 = vals.body.password2
    if(psw !== psw2){
      throw new Error('两个密码必须相同')
    }
  }

  async validateEmail(vals){
    const email = vals.body.email
    const user = await User.findOne({
      where: {
        email
      }
    })
    if(user){
      throw new Error('email 已存在')
    }
  }
}

// 验证登录
class TokenValidator extends LuckyValidator {
  constructor(){
    super()
    // 账号
    this.account = [ 
      new Rule('isLength','不符合账户规则',{
        min: 4,
        max: 32
      })
    ]
    // 密码
    this.secret = [
      // isOptional 是自己编写的验证函数，不属于 validator.js
      // isOptional 可以不传，不传的话必须要满足 isLength 规范
      new Rule('isOptional'),
      new Rule('isLength','至少6个字符',{
        min: 6,
        max: 128
      })
    ]
  }
  // 定义类型 type 其他语言的话可以是用枚举
  // JS 本身是没有枚举的，可以模拟枚举

  validateLoginType(vals){
    if(!vals.body.type){
      throw new Error('type必须是参数')
    }
    if(!LoginType.isThisType(vals.body.type)){
      throw new Error('type参数不合法')
    }
  }
}


class NoEmptyValidator extends LuckyValidator{
  constructor(){
    super()
    this.token = [
      new Rule('isLength', '不允许为空', {min: 1})
    ]
  }
}

function checkType(vals) {
  if (!vals.body.type) {
    throw new Error('type是必须参数')
  }
  if (!LoginType.isThisType(vals.body.type)) {
    throw new Error('type参数不合法')
  }
}
class LikeValidator extends PositiveIntegerValidator {
  constructor(){
    super()
    this.validateType = checkType
  }
}
module.exports = {
  PositiveIntegerValidator,
  RegisterValidator,
  TokenValidator,
  NoEmptyValidator,
  LikeValidator
}