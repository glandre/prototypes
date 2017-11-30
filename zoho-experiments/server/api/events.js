const bodyParser = require('body-parser')
const NoSQL = require('nosql')
const db = NoSQL.load('events')

module.exports = (uri, router) => {
  router.get(`${uri}`, (req, res) => {
    const events = db.find().make((builder) => {
      builder.callback((err, events) => {
        res.status(200).json({
          count: events.length || 0,
          events
        })
      })
    })
  })
  
  // router.post(`${uri}`, (req, res) => {
  //   if (!req.body || !req.body.event) {
  //     res.status(400).send({ error: 'event is required' })
  //     return
  //   }
  //   const { event } = req.body
  //   console.log('event:', event)
  //   db.insert({
  //     ...event,
  //     timestamp: new Date(),
  //     ref: 1
  //   }).callback((err) => {
  //     if (err) {
  //       const message = 'error inserting the event'
  //       console.log(message, err)
  //       res.status(400).send({ error: message })
  //       return
  //     }
  //     const message = 'event successfuly inserted'
  //     console.log(message)
  //     res.status(200).send({ message })
  //     return
  //   })
  // })
  
  // router.delete(`${uri}/all`, (req, res) => {
  //   db.remove().make(builder => {
  //     builder.callback((err, count) => {
  //       if (err) {
  //         const message = 'error trying to remove document'
  //         console.log(message, err)
  //         res.status(200).send({ error: message })
  //         return
  //       }
  //       const message = `removed documents: ${count}`
  //       console.log(message)
  //       res.status(200).send({ message })
  //     })
  //   })
  // })
}
