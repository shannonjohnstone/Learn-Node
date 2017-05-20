module.exports = (req, res) => {
  req.logout()
  req.flash('success', 'You are not logded out')
  res.redirect('/')
}
