const mongoose = require('mongoose')
const User = mongoose.model('User')

module.exports = async (req, res) => {
  const hearts = req.user.hearts.map(obj => obj.toString()) // creates an array of strings to check with includes
  const operator = hearts.includes(req.params.id) ? '$pull' : '$addToSet' // if store is already hearts make operator pull if not make it add
  const user = await User.findByIdAndUpdate(req.user._id, { [operator]: { hearts: req.params.id } }, { new: true }) // find user, update and return updated user
  res.json(user)
}

// $pull will pull an item and addToSet will add but it will not let you double up the same item
// new: true will return the find the user and return the updated user, so it will find and then wait to return until the operation is finished
