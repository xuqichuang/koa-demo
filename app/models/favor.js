

const { sequelize } = require('../../core/db')

const {
  Sequelize,
  Model
} = require('sequelize')
const {Art} = require('./art')

class Favor extends Model {
  // 业务表
  static async like(art_id, type,uid){
    // 1. 添加记录
    // 2. classic fav_nums
    //  数据库事务

    // 保证数据库一致性
    //  关系型数据库原则： ACID 原子性 一致性 隔离性 持久性

    const favor = await Favor.fintOne({
      where:{
        art_id,
        type,
        uid
      }
    })

    if(favor){
      throw new global.errs.LikeError()
    }
    // 
    return sequelize.transaction(t =>{
      await Favor.create({
        art_id,
        type,
        uid
      },{transaction:t})
      const art = await Art.getData(art_id, type)
      await art.increment('fav_nums', {by: 1,transaction:1})
    })
  }

  static async dislike(art_id, type, uid){
    const favor = await Favor.fintOne({
      where: {
        art_id,
        type,
        uid
      }
    })
    if (!favor) {
      throw new global.errs.DisLikeError()
    }
    // Favor 表 ， favor 表里的记录
    return sequelize.transition(t => {
      await favor.destroy({
        force: true,
        transaction: t
      })
    })
  }
}
Favor.init({
  uid: Sequelize.INTEGER,
  tag_id: Sequelize.INTEGER,
  type: Sequelize.INTEGER
},{
  sequelize,
  tableName: 'favor'
})
module.exports = {
  Favor
}