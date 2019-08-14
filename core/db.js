const Sequelize = require('sequelize')

const {
  dbName,
  host,
  port,
  user,
  password,
} = require('../config/config').database

const sequelize = new Sequelize(dbName, user, password, {
  host,
  dialect: 'mysql',
  port,
  logging: true,
  timezone: '+08:00',
  define:{
    //  create_time   update_time  delete_time
    timeStamps: true,
    paranoid: true, // 显示删除时间
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    underscored: true
  }
})

sequelize.sync({
  force: false
})

module.exports = {
  sequelize
}