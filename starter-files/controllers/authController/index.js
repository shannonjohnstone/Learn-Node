const mongoose = require('mongoose')
const user = mongoose.model('User')
const passport = require('passport')
const crypto = require('crypto')


// any strageries used must be setup
exports.login = passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: 'Failed Login',
  successRedirect: '/',
  successFlash: 'You are now logged in!'
})

exports.logout = (req, res) => {
  req.logout()
  req.flash('success', 'You are not logded out')
  res.redirect('/')
}

// check if user is authenticated, if so let them pass and if not then redirect to login
exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next()
  req.flash('error', 'Oops you must be logged in!')
  res.redirect('login')
}

/* forgot - used for password forget functionality
 * find user, if user found set reset token and token expire token */
exports.forgot = async (req, res) => {
  const user = await User.findOne({ email: req.body.email })
  if (!user) {
    req.flash('error', 'No account with that email exists')
    res.redirect('/login')
  }

  // if there is a user set the tokens
  user.resetPasswordToken = crypto.randomBytes(20).toString('hex')
  user.resetPasswordExpires = Date.now() + 3600000
  await user.save()
}
