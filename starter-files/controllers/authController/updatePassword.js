const { findUserWithTokens, resetTokens } = require('./authUtils')
const promisify = require('es6-promisify')

/* find the user matching the tokens, if user update, if not redirect and show message */
module.exports = async (req, res) => {
  const user = await findUserWithTokens(req.params.token)
  if (!user) return noUserError(req.flash, res.redirect, 'Password reset is invalid or expired', '/login')

  const setPassword = promisify(user.setPassword, user)
  await setPassword(req.body.password)

  resetTokens(user)

  const updatedUser = await user.save()
  await req.login(updatedUser)
  req.flash('success', '💃 Nice! Your password has been reset! You are not logged in!')
  res.redirect('/')
}
