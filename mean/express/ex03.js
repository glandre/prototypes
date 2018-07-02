const express = require('express')
const server = express()

// is used by all handlers that starts with '/api'
server.use('/api', (req, res, next) => {
  console.log('Start!')
  next()
  console.log('End...')
})

// is used by all request handlers
server.use((req, res) => {
  console.log('Response...')
  res.send('<h1>API!</h1>')
})

server.listen(3000, () => console.log('Executando...'))
