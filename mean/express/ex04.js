const express = require('express')
const server = express()

server.route('/clients')
  .get((req, res) => res.send('Clients List'))
  .post((req, res) => res.send('New client'))
  .put((req, res) => res.send('Update client'))
  .delete((req, res) => res.send('Delete client'))

server.listen(3000, () => console.log('Executando...'))
