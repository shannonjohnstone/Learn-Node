const mongoose = require('mongoose');
const Store = mongoose.model('Store')
const User = mongoose.model('User')

module.exports = async (req, res) => {
  // const stores = await User.findOne({ _id: req.user._id }).populate('hearts') //  method 1: find user by id and then popualte their hearted stores
  const stores = await Store.find({ _id: { $in: req.user.hearts } }) // method 2: find stores that match the ids in the users hearts array, this way does not expose the user details
  res.render('stores', { title: 'Hearted stores', stores })
}
 
