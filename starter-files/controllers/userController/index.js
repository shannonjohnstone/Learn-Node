const loginForm = require('./loginForm')
const registerForm = require('./registerForm')
const account = require('./account')
const { validateRegister, register } = require('./validateRegister')
const updateAccount = require('./updateAccount')

module.exports = {
  loginForm,
  registerForm,
  validateRegister,
  register,
  account,
  updateAccount
}
