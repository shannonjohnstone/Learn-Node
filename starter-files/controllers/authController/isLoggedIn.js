// check if user is authenticated, if so let them pass and if not then redirect to login
module.exports = (req, res, next) => {
  if (req.isAuthenticated()) return next()
  req.flash('error', 'Oops you must be logged in!')
  res.redirect('login')
}
