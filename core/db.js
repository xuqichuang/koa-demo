const {
  Model,
  Sequelize
 } = require('sequelize')

const {
  clone,
  unset,
  isArray
} = require('lodash')

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

Model.prototype.toJSON = function(){
  let data = clone(this.dataValues)
  unset(data, 'updated_at')
  unset(data, 'created_at')
  unset(data, 'deleted_at')

  if(isArray(this.exclude)){
    this.exclude.forEach(value=>{
      unset(data, value)
    })
  }
  return data
}

module.exports = {
  sequelize
}