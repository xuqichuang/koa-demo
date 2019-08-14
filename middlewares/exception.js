const {HttpException} = require('../core/http-exception')
const catchError = async (ctx, next)=>{
    try {
        await next()
    } catch (error) {
        // errorCode
        // message
        // request_url
        const isEnv = global.config.environment == 'dev'
        const isHttpException = error instanceof HttpException
        if(isEnv && !isHttpException){
            throw error
        }
        if(isHttpException){ // 已知异常
            ctx.body = {
                msg: error.msg,
                errorCode:error.errorCode,
                requestUrl: `${ctx.method} ${ctx.path}`
            }
            ctx.status = error.statusCode
        }else{ // 未知异常
            ctx.body = {
                msg: `we made a mistake 0(n_n)0~~`,
                errorCode: 999,
                requestUrl: `${ctx.method} ${ctx.path}`
            }
            // 500 通常表示服务器内部错误
            ctx.status = 500
        }
    }
}
module.exports = {
    catchError
}