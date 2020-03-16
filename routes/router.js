const express = require('express')
const User = require('../models/user')
const md5 = require('blueimp-md5')

const router = express.Router()

router.get('/', function (request, response) {
  response.render('index.html', {user: request.session.user})
})

router.get('/register', function (request, response) {
  response.render('register.html')
})

router.post('/register', function (request, response, next) {
  var formData = request.body
  User.findOne({email: formData['email']}, function (error, user) {
    if (error) {
      return next(error)
    }
    if (user) {
      return response.status(200).json({ // json是express提供的返回json字符串的方法，参数是个JS对象
        error_code: 1,
        message: '邮箱已存在'
      })
    }
    User.findOne({nickname: formData['nickname']}, function (error, user) {
      if (error) {
        return next(error)
      }
      if (user) {
        return response.status(200).json({
          error_code: 2,
          message: '昵称已存在'
        })
      }
      formData.password = md5(md5(formData.password))
      new User(formData).save(function (error, user) {
        if (error) {
          return next(error)
        }
        request.session.user = user
        response.status(200).json({
          error_code: 0,
          message: 'OK'
        })
      })
    })
  })
})

router.get('/login', function (request, response) {
  response.render('login.html', {
    email: request.session['email']
  })
})

router.post('/login', function (request, response, next) {
  User.findOne({
    email: request.body['email'],
    password: md5(md5(request.body['password']))
  }, function (error, user) {
    if (error) {
      return next(error)
    }
    if (!user) {
      return response.status(200).json({
        error_code: 1,
        message: '邮箱或密码错误'
      })
    }
    if (request.body['remember']) {
      request.session.email = request.body['email']
      request.session.password = request.body['password']
    }
    request.session.user = user
    response.status(200).json({
      error_code: 0,
      message: '登录成功'
    })
  })
})

router.get('/logout', function (request, response) {
  // 把session删了就OK了
  request.session.user = null
  response.redirect('/') // 然后重定向会主页
})

module.exports = router
