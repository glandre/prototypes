const express = require('express')
const helmet = require('helmet')
const mongoose = require('mongoose')
const morgan = require('morgan')
const customers = require('./customers/routes')
const genres = require('./genres/routes')
const movies = require('./movies/routes')

const app = express()

app.use(helmet())
app.use(morgan('tiny'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// connect to mongoose
const dbuser = process.env.VIDLY_DB_USER
const dbpassword = process.env.VIDLY_DB_PWD
const dbhost = process.env.VIDLY_DB_HOST
if (!dbuser || !dbpassword || !dbhost) {
	throw new Error('Missing Database Environment Variables')
}
const mongoUri = `mongodb://${dbuser}:${dbpassword}@${dbhost}/nodejs-master-class`
mongoose.connect(mongoUri, {useNewUrlParser: true})
	.then(() => console.log('MongoDB connection successful!'))
	.catch(err => console.log('Error connecting to MongoDB!', err))

// routes
app.get('/', (req, res) => {
	return res.send('Hello From Vidly!')
})

app.use('/customers', customers())
app.use('/genres', genres())
app.use('/movies', movies())

const port = process.env.PORT || 3001
app.listen(port, () => console.log(`Listening on port ${port}`))
