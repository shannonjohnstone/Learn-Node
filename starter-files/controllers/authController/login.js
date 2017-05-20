const passport = require('passport')

module.exports = passport.authenticate('local', { // any strageries used must be setup, in this case that is local
  failureRedirect: '/login',
  failureFlash: 'Failed Login',
  successRedirect: '/',
  successFlash: 'You are now logged in!'
})
