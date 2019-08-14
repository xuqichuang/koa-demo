const Router = require('koa-router')
const router = new Router({
    prefix: '/v1/classic'
})
const { Auth } =require('../../../middlewares/auth')
const { success } = require('../../lib/helper')


router.get('/latest', new Auth().m, async (ctx, next)=>{
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
    ctx.body = ctx.auth.uid
    success()
})

module.exports = router