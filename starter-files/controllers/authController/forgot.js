const crypto = require('crypto')
const mail = require('../../handlers/mail');
const { findUserByEmail, noUserError } = require('./authUtils')

/* forgot - used for password forget functionality
 * find user, if user found set reset token and token expire token */
module.exports = async (req, res) => {
  const user = await findUserByEmail(req.body.email)
  if (!user) return noUserError(req, res, 'No account with that email exists', '/login')

  // if there is a user set the tokens
  user.resetPasswordToken = crypto.randomBytes(20).toString('hex')
  user.resetPasswordExpires = Date.now() + 3600000
  await user.save()

  const resetURL = `http://${req.headers.host}/account/reset/${user.resetPasswordToken}`

  try {
    await mail.send({
      user,
      subject: 'Password Reset',
      resetURL,
      filename: 'password-reset'
    })
  } catch (e) {
    req.flash('error', 'Email service failed, please try again.')
    return res.redirect('/login')
  }

  req.flash('success', `You have been emailed a password reset link.`)
  res.redirect('/login')
}
