const express = require('express')
const server = express()

server.get('/', (req, res) => {
  res.send('<h1>Index!</h1>')
})

server.all('/test', (req, res) => {
  res.send('<h1>Test!</h1>')
})

server.get(/api/, (req, res) => {
  res.send('<h1>API!</h1>')
})

server.listen(3000, () => console.log('Executando...'))