const { 
  Article,
  Product,
  Movie
} = require('./classic')
class Art {
  static async getData(art_id, type){
    let art = null
    const finder = {
      where: {
        id: art_id
      }
    }
    switch (type){
      case 100:
        art = await Article.findOne(finder)
        break;
      case 200:
        art = await Movie.findOne(finder)
        break;
      case 300:
        art = await Product.findOne(finder)
        break;
      case 400:
        break;
      default:
        break;
    }
    if(art && art.image){
      let imgUrl = art.getDataValue('image')
      art.setDataValue('image',global.config.host + imgUrl)
    }
    return art;
  }
}

class Tag{
  static async getData(tag_id, type){
    let tag = null
    const finder = {
      where: {
        tag_id: tag_id
      }
    }
    switch (parseInt(type)) {
      case 100:
        tag = await Article.findAll(finder)
        break;
      case 200:
        tag = await Movie.findAll(finder)
        break;
      case 300:
        tag = await Product.findAll(finder)
        break;
      case 400:
        break;
      default:
        break;
    }
    if (tag && tag.image) {
      let imgUrl = tag.getDataValue('image')
      tag.setDataValue('image', global.config.host + imgUrl)
    }
    return tag;
  }
}

module.exports = {
  Art,
  Tag
}