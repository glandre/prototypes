var express = require('express')


var routes = require('./api/routes')

var app = express()

app.use('/api', routes)

const port = 3000
app.listen(port, () => console.log(`server running on port ${port}`))