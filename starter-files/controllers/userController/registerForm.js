const mongoose = require('mongoose')
const User = mongoose.model('User')
const promisufy = require('es6-promisify')

module.exports = (req, res) => {
  res.render('register', { title: 'Register' })
}
