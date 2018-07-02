const express = require('express')
const server = express()

server.get('/', (req, res, next) => {
  console.log('Start!')
  next()
  console.log('End...')
})

server.get('/', (req, res) => {
  console.log('Response...')
  res.send('<h1>Hello Express!</h1>')
})

server.listen(3000, () => console.log('Executando...'))
