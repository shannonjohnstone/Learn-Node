module.exports = (req, res) => {
  res.render('index', { title: 'I love food', name: req.name })
}
