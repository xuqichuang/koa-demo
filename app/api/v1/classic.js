const Router = require('koa-router')
const router = new Router({
    prefix: '/v1/classic'
})
const { Auth } =require('../../../middlewares/auth')
const { success } = require('../../lib/helper')
const { Flow }  = require('../../models/flow')
const { Art, Tag } = require('../../models/art')

// new Auth().m,
router.get('/latest', async (ctx, next)=>{
    // 排序，获取数据库最大的值
    // console.log(ctx)
    // const path = ctx.params
    // const query = ctx.request.query
    // const header = ctx.request.header
    // const body = ctx.request.body
    // console.log(path,query,body)
    // // abc
    // if(!query){
    //     const error = new global.errs.ParameterException()
    //     throw error
    // }
    // ctx.body = {
    //     key: 'classic'
    // }
    const flow = await Flow.findOne({
        order:[
            ['index', 'DESC']
        ]
    })
    console.log(flow)
    const art = Art.getData(flow.art_id,flow.type)
    ctx.body = art
})

router.post('/tag', async (ctx, next) => {
    const query = ctx.request.query
    if (!(query.tag_id && query.type)){
        const error = new global.errs.ParameterException()
        throw error
    }
    const tag = await Tag.getData(query.tag_id, query.type)
    ctx.body = tag
})

module.exports = router