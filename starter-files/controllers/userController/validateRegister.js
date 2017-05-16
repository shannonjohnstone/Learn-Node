const mongoose = require('mongoose')
const User = mongoose.model('User')
const promisify = require('es6-promisify')

exports.validateRegister = (req, res, next) => {
  // This validation is the server side, this is a fallback if something has gone wrong with the client side validation
  req.sanitizeBody('name')
  req.checkBody('name', 'You must supply a name').notEmpty()
  req.checkBody('email', 'You must supply a email').isEmail()
  req.sanitizeBody('email').normalizeEmail({
    remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false
  })
  req.checkBody('password', 'Password Cannot be Blank!').notEmpty()
  req.checkBody('password-confirm', 'Oops! Your passwords do not match').equals(req.body.password)

  // If there are any errors herer we will set some flash messages, in this case we are not making a new request so we explictly set req.flash
  const errors = req.validationErrors()
  if (errors) {
    req.flash('error', errors.map(err => err.msg))
    res.render('register', { title: 'Register', body: req.body, flashes: req.flash() })
    return
  }
  next() // no errors, go to next middleware/route
}

exports.register = async (req, res, next) => {
  const user = new User({ email: req.body.email, name: req.body.name })
  const register = promisify(User.register, User)
  await register(user, req.body.password)
  next() // passing to authController.login
}
