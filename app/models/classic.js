// 文章，产品，视频
const { sequelize } = require('../../core/db')

const {
  Sequelize,
  Model
} = require('sequelize')

const classicFields ={
  image: Sequelize.STRING,
  content: Sequelize.STRING,
  title: Sequelize.STRING,
  pubdate: Sequelize.DATEONLY,
  fav_nums: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  type: Sequelize.INTEGER,
  tag_id: Sequelize.INTEGER,
  url: Sequelize.STRING,
}

class Article extends Model {

}

Article.init(classicFields,{
  sequelize,
  tableName: 'article'
})

class Product extends Model {

}

const productFields = Object.assign(classicFields,{
  rate: Sequelize.FLOAT
})
Product.init(productFields,{
  sequelize,
  tableName: 'product'
})

class Movie extends Model {

}
Movie.init(classicFields, {
  sequelize,
  tableName: 'movie'
})

module.exports = {
  Article,
  Product,
  Movie
}
