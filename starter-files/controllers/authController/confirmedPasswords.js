// check for the matching password
module.exports = (req, res, next) => {
  if (req.body.password === req.body['password-confirm']) return next() // match
  // not match
  req.flash('error', 'Password do not match!')
  res.redirect('back')
}
