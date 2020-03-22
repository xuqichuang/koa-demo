const Koa = require('koa')
const parser = require('koa-bodyparser') // 用于获取post请求 body 下的内容
const path = require('path')

const InitManager = require('./core/init')
const {catchError} = require('./middlewares/exception')
const static = require('koa-static')


const app = new Koa()
app.use(catchError)
app.use(parser())
app.use(static(path.join(__dirname,'./static')))

InitManager.initCore(app)

app.listen(3000)