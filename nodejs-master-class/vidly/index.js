const express = require('express')
const app = express()

const genres = require('./genres/routes')

app.use(express.json())

// routes
app.get('/', (req, res) => {
	return res.send('Hello From Vidly!')
})

app.use('/genres', genres())

const port = process.env.PORT || 3001
app.listen(port, () => console.log(`Listening on port ${port}`))
