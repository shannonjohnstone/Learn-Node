const { findUserWithTokens, noUserError } = require('./authUtils')

/* reset - finds user, redirects to reset form, if not user redirect to login page with message */
module.exports = async (req, res) => {
  // check for tokens and check the expire token is still valid
  const user = await findUserWithTokens(req.params.token)

  // check if user found
  if (!user) return noUserError(req, res, 'Password reset is invalid or expired', '/login')
  res.render('reset', { title: 'Reset your password' }) // if user show the password reset password form
}
