const express = require('express')

const router = express.Router()

router.get('/admin', function (request, response, next) {

})

router.post('/admin', function (request, response, next) {

})

router.get('/profile', function (request, response, next) {
  response.render('settings/profile.html', {user: request.session.user})
})

router.post('/profile', function (request, response, next) {

})

module.exports = router
