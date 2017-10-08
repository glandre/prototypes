const http = require('http')

const server = http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'})
  res.end('<h1>It\'s better to use Express, isn\'t it?</h1>')
})

const port = 3456

server.listen(port, function () {
  console.log(`Listening port ${port}`)
})