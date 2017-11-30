const bodyParser = require('body-parser')
const zohoService = require('../services/zoho')

const defaultHandler = (req, res) => (response) => {
  const { data, ok, problem } = response
  if (ok) {
    return res.status(200).send(data)
  }
  console.log('BAD RESPONSE DATA:', data)
  return res.status(400).send(problem)
}

module.exports = (uri, router) => {
  router.get(`${uri}/hello`, (req, res) => {
    console.log('Hello world!')
    res.status(200).json({
      message: 'Hi there! Zoho here...'
    })
  })

  router.get(`${uri}/organizations`, (req, res) => {
    console.log('getting organizations...')
    zohoService.listOrganizations()
      .then(defaultHandler(req, res))
  })

  router.get(`${uri}/subscriptions`, (req, res) => {
    console.log('getting subscriptions...')
    zohoService.listSubscriptions()
      .then(defaultHandler(req, res))
  })
  
  router.get(`${uri}/new-hosted-page`, (req, res) => {
    console.log('getting new-hosted-page...')
    zohoService.createHostedPage()
      .then(defaultHandler(req, res))
  })

  router.get(`${uri}/products`, (req, res) => {
    console.log('getting products...')
    zohoService.listProducts()
      .then(defaultHandler(req, res))
  })
}