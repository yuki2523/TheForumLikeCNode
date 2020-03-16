const express = require('express')

const router = express.Router()

router.get('/image/', function (request, response) {
  response.render('imageShow.html')
})

router.get('/img/', function (request, response) {
  var imageUrl = [
    '/public/image/spring.webp',
    '/public/image/summer.webp',
    '/public/image/autumn.webp',
    '/public/image/winter.webp'
  ]
  response.send(JSON.stringify(
    {image: imageUrl[request.query['index']]}
  ))
})

module.exports = router
