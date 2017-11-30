const bodyParser = require('body-parser')
const NoSQL = require('nosql')
const db = NoSQL.load('events')

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false })

module.exports = (uri, router) => {
  router.post(uri, urlencodedParser, (req, res) => {
    if (!req.body || !req.body.payload == null) {
      return res.status(400).send({ error: 'Payload expected' })
    }
    const payload = JSON.parse(req.body.payload)
    console.log(`Event Happened: ${payload.event_id} - ${payload.event_type}`)
    db.insert({
      timestamp: new Date(),
      payload
    }).callback(err => {
      if (err) {
        return res.status(500).send({ error: 'Internal Server Error' })
      }
      return res.status(200).send({ message: 'success' })
    })
  })
}