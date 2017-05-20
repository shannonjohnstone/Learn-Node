const mongoose = require('mongoose')
const User = mongoose.model('User')

// authController util functions
function findUserByEmail(email) {
  return User.findOne({ email })
}

function noUserError(req, res, message, location) {
    req.flash('error', message)
    res.redirect(location)
}

module.exports = {
  findUserByEmail,
  noUserError
}
