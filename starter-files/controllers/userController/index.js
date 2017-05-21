const loginRender = require('./loginRender')
const registerRender = require('./registerRender')
const accountRender = require('./accountRender')
const { validateRegister, register } = require('./validateRegister')
const updateAccount = require('./updateAccount')

module.exports = {
  loginRender,
  registerRender,
  validateRegister,
  register,
  accountRender,
  updateAccount
}
