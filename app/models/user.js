//  密码加密处理
const bcrypt = require('bcryptjs');

const {sequelize} = require('../../core/db')
const {
  Sequelize,
  Model
} = require('sequelize')

class User extends Model {
  // 验证账户密码
  static async verifyEmailPassword(email, plainPassword) {
    const user = await User.findOne({
      where:{
        email
      }
    })
    if(!user){
      throw new global.errs.NotFound('用户不存在')
    }
    //  plainPassword 是未加密的
    const correct = bcrypt.compareSync(plainPassword, user.password)
    if(!correct){
      throw new global.errs.AuthFailed('密码不正确')
    }
    return user
  }
}

// mysql 一一对应的关系
// id 主键类型一定要是数字类型的，最好不要用字符串，随机字符串 =》 GUID ，数据量大的时候很消耗时间
// 自己设计主键的时候要考虑到并发， 1000个人同时注册
// 即使别人知道了用户 id 他也无法做坏事
// 接口保护 设置权限访问接口 Token令牌
User.init(
  {
    id:{
      type: Sequelize.INTEGER,
      primaryKey: true, // 主键
      autoIncrement: true
    },
    nickname:Sequelize.STRING,
    email: {
      type: Sequelize.STRING(128),
      unique: true, // 唯一的
    },
    password: {
      //  扩展，设计模式，观察者模式
      //  ES6 Reflect Vue
      type: Sequelize.STRING,
      set(val){
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(val, salt)
        // setDataValue => Model 中的 setDataValue 方法
        this.setDataValue('password', hash)
      }
    },
    openid:{
      type: Sequelize.STRING(64),
      unique: true, // 唯一的
    },
  },
  {
    sequelize,
    tableName: 'user', // 数据迁移, SQL 更新 会有一定的风险性
  }
)

module.exports = {
  User
}