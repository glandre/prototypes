module.exports = (uri, router) => {
  router.get(uri, (req, res) => {
    console.log('Hello world!')
    res.status(200).json({
      message: 'Hi there!'
    })
  })
}