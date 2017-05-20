const login = require('./login')
const logout = require('./logout')
const isLoggedIn = require('./isLoggedIn')
const forgot = require('./forgot')
const reset = require('./resetPassword')
const confirmedPasswords = require('./confirmedPasswords')
const update = require('./updatePassword')

module.exports = {
  login,
  logout,
  isLoggedIn,
  forgot,
  reset,
  confirmedPasswords,
  update
}
