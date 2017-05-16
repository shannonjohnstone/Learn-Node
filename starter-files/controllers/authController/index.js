const passport = require('passport')

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
