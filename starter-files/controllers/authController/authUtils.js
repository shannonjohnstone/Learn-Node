const mongoose = require('mongoose')
const User = mongoose.model('User')
const { findUserByEmail, noUserError } = require('../controllerUtils');

function findUserWithTokens(paramTokenValue) {
  return User.findOne({
    resetPasswordToken: paramTokenValue,
    resetPasswordExpires: { $gt: Date.now() }
  })
}

function resetTokens(user) {
  user.resetPasswordToken = undefined
  user.resetPasswordExpires = undefined
}

module.exports = {
  findUserByEmail,
  findUserWithTokens,
  noUserError,
  resetTokens
}
