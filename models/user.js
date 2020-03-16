const mongoose = require('mongoose')

const Schema = mongoose.Schema

mongoose.connect('mongodb://localhost:27017/blogProject', {useNewUrlParser: true, useUnifiedTopology: true})

const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  nickname: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  created_date: {
    type: Date,
    default: Date.now // 不要去调用，也就是不要加括号，而且就用Date.now就行了
  },
  last_modified_date: {
    type: Date,
    default: Date.now
  },
  avatar: {
    type: String,
    default: '/public/img/avatar-default.png'
  },
  bio: {
    type: String,
    default: ''
  },
  sex: {
    type: Number,
    enum: [-1, 0, 1],
    default: -1
  },
  status: {
    type: Number,
    // 状态码 0：无限制；1：禁止发言；2：禁止登陆
    enum: [0, 1, 2],
    default: 0
  },
  birthday: {
    type: Date
  }
})

module.exports = mongoose.model('User', UserSchema)
