
const Router = require('koa-router')

const router = new Router({
  prefix: '/v1/like'
})
const { Auth } = require('../../../middlewares/auth')
const { success } = require('../../lib/helper')

router.post('/', async ctx =>{
  const v = await new LikeValidator().validate(ctx,{
    id: 'art_id'
  })
  await Favor.like(
    v.get('body.art_id'), v.get('body.type')
  )
  success()
})

router.post('/cancle', async ctx => {
  const v = await new DisLikeValidator().validate(ctx, {
    id: 'art_id'
  })
  await Favor.disLike(
    v.get('body.art_id'), v.get('body.type')
  )
  success()
})