
const { sequelize } = require('../../core/db')

const {
  Sequelize,
  Model
} = require('sequelize')

class Flow extends Model {

}

Flow.init({
  index: Sequelize.INTEGER, // 期刊
  art_id: Sequelize.INTEGER, // 关联表 id
  type: Sequelize.INTEGER, // 具体对应那个数据表
},{
  sequelize,
  tableName: 'flow'
})

class Tag extends Model {

}

Tag.init({
  tag_name: Sequelize.STRING, // 标签名
  tag_id: Sequelize.INTEGER, // 关联表类型
  type: Sequelize.INTEGER,
}, {
  sequelize,
  tableName: 'tag'
})

module.exports = {
  Flow,
  Tag 
}