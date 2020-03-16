const express = require('express')

const router = require('./routes/router')
const settings = require('./routes/setting')
const imageRouter = require('./routes/image')

const path = require('path')
const session = require('express-session')

const app = express()

app.engine('html', require('express-art-template'))
app.set('views', path.join(__dirname, 'views'))
app.use('/public/', express.static(path.join(__dirname ,'public')))
app.use('/node_modules/', express.static(path.join(__dirname ,'node_modules')))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Express默认不支持session和cookie,要使用express-session来处理
// 而且一定要配置在路由之前
app.use(session({ // 配置了这个request里就有session了
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.use(router)
app.use('/settings', settings)
app.use(imageRouter)

// 添加中间件处理 404
// 这个中间件一定要放在最后，放到前面去了就全是404了
// 本来在这里就是为了匹配上面所有中间件都无法处理的请求，然后返回一个404页面作为响应
app.use(function (request, response, next) {
  response.render('404.html')
})

// 全局统一错误处理
// 记得这四个参数每个参赛的位置都一点不能有偏差
// 因为它们都是形参，如果位置出现偏差，就匹配不上对应的参了
// app.use(function (error, request, response, next) {
//   response.status(500).send('服务器繁忙，请稍后再试')
// })

app.listen(3000, function () {
  console.log('running ......')
})
