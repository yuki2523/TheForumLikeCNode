const mongoose = require('mongoose')

const Schema = mongoose.Schema

mongoose.connect('mongodb://localhost:27017/blogProject', {useNewUrlParser: true, useUnifiedTopology: true})


