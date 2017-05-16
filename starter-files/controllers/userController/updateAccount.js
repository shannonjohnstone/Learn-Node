const mongoose = require('mongoose')
const User = mongoose.model('User')

module.exports = async (req, res) => {
  const updates = {
    name: req.body.name,
    email: req.body.email
  }

  const user = await User.findOneAndUpdate(
    { _id: req.user._id }, // query
    { $set: updates }, // updates
    { new: true, runValidators: true, context: 'query' }// options
  )

  req.flash('success', 'Update successfully')
  res.redirect('back')
}
