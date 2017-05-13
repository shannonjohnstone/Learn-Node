const mongoose = require('mongoose')
const Store = mongoose.model('Store')

module.exports = (req, res) => {
  res.render('editStore', { title: 'Add Store' })
}
