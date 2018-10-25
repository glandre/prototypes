const Joi = require('joi')
const express = require('express')
const app = express()

const validateCourse = (course) => {
	const schema = {
		name: Joi.string().min(3).required()
	}
	return Joi.validate(course, schema)
}

const sendBadRequest = (res, error) => {
	return res.status(400).send(error.details.map(d => d.message))
}

app.use(express.json())

const courses = [
	{ id: 1, name: 'course 1' },
	{ id: 2, name: 'course 2' },
	{ id: 3, name: 'course 3' },
]

app.get('/', (req, res) => {
	return res.send('Hello World')
})

app.get('/api/courses', (req, res) => {
	return res.send(courses)
})

app.post('/api/courses', (req, res) => {
	const schema = {
		name: Joi.string().min(3).required()
	}
	const {error} = validateCourse(req.body)
	console.log({error})

	if (error) {
		// 400 Bad Request
		return sendBadRequest(res, error)
	}
	const course = {
		id: courses.length + 1,
		name: req.body.name
	}
	courses.push(course)
	return res.send(course)
})

app.put('/api/courses/:id', (req, res) => {
	// Look up the course
	const index = courses.findIndex(c => c.id === parseInt(req.params.id))
	// If not existing, return 404
	if (!courses[index]) {
		return res.status(404).send('Course not found')
	}
	// Validate
	// If invalid, return 400 - Bad request
	const {error} = validateCourse(req.body)
	if (error) {
		return sendBadRequest(res, error)
	}

	// Update course
	courses[index].name = req.body.name

	// return object
	return res.send(courses[index])
})

app.get('/api/courses/:id', (req, res) => {
	const course = courses.find(c => c.id === parseInt(req.params.id, 10))
	if (!course) {
		return res.status(404).send('The course with the given ID was not found')
	} 
	return res.send(course)
})

app.delete('/api/courses/:id', (req, res) => {
	// Look up the course
	const index = courses.findIndex(c => c.id === parseInt(req.params.id))
	// If not existing, return 404
	if (!courses[index]) {
		return res.status(404).send('Course not found')
	}
	
	const course = courses[index]
	courses.splice(index, 1)

	return res.send(course)
})

app.listen(3001, () => console.log('Listening on port 3001...'))