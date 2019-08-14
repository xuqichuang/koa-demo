const Koa = require('koa')
const parser = require('koa-bodyparser') // 用于获取post请求 body 下的内容

const InitManager = require('./core/init')
const {catchError} = require('./middlewares/exception')


const app = new Koa()
app.use(catchError)
app.use(parser())

InitManager.initCore(app)

app.listen(3000)