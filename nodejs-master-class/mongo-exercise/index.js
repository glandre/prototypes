const express = require('express')
const helmet = require('helmet')
const Joi = require('joi')
const mongoose = require('mongoose')
const morgan = require('morgan')
const {pickNotNil} = require('./utils')

const app = express()

// midlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(helmet())
app.use(morgan('tiny'))

// mongoose connect
const dbuser = process.env.MONGO_EXERCISE_DB_USER
const dbpassword = process.env.MONGO_EXERCISE_DB_PWD
const dbhost = process.env.MONGO_EXERCISE_DB_HOST
if (!dbuser || !dbpassword || !dbhost) {
	throw new Error('Missing Database Environment Variables')
}
const mongoUri = `mongodb://${dbuser}:${dbpassword}@${dbhost}/nodejs-master-class`

mongoose.connect(mongoUri, {useNewUrlParser: true})
	.then(() => console.log('Connected to MongoDB'))
	.catch(err => console.log('Could not connect to MongoDB...', err))

// mongoose create schema
const courseSchema = new mongoose.Schema({
    tags: {
    	type: [String],
    	validate: {
    		validator: function (v) {
    			return v && v.length > 0
    		},
    		message: 'A course should have at least one tag'
    	}
    },
    category: {
    	type: String,
    	enum: ['web', 'mobile', 'network']
    },
    date: {type: Date, default: Date.now},
    name: {
    	type: String, 
    	required: true,
    	minlength: 3,
    	maxlength: 255,
    	// match: /pattern/
    },
    author: {
    	type: String, 
    	required: true,
    	minlength: 3,
    	maxlength: 255
    },
    isPublished: {type: Boolean, default: false},
    price: {
    	type: Number,
    	required: function () {
    		console.log('required function - isPublished:', this.isPublished)
    		const isRequired = !!this.isPublished
    		console.log('required function - isRequired:', isRequired)
    		return isRequired
    	},
    	min: 10,
    	max: 200
    },
})
// console.log('courseSchema.obj', courseSchema.obj)

// mongoose create model
const Course = mongoose.model('courses', courseSchema)

const validateCourseUpdatePayload = (course) => {
	const schema = Joi.object().keys({
		tags: Joi.array().items(Joi.string()),
		name: Joi.string().min(3).max(255),
		author: Joi.string().min(3).max(255),
		isPublished: Joi.boolean(),
		date: Joi.date(),
		price: Joi.number()
	})
	return Joi.validate(course, schema)
}

// routes
app.get('/', (req, res) => {
	res.send('Hello world')
})

app.get('/courses', async (req, res) => {
	try {
		const {query} = req

		// Find Filters
		const isPublishedStr = (query.isPublished+'').toLowerCase()
		const isPublished = isPublishedStr === 'true' ? true : isPublishedStr === 'false' ? false : null

		let filters = {}
		if (isPublished != null) {
			filters = Object.assign({}, filters, {isPublished})
		}

		// Using IN operator
		const tags = query.tags ? query.tags.split(',') : null
		if (tags != null) {
			filters = Object.assign({}, filters, { tags: { $in: tags } })
		}

		let dbQuery = Course.find(filters)
	
		// // Using OR operator
		// const tags = query.tags ? query.tags.split(',') : null
		// if (tags != null) {
		// 	const orFilter = []
		// 	for (const tag of tags) {
		// 		orFilter.push({tags: tag})
		// 	}
		// 	dbQuery = dbQuery.or(orFilter)
		// 	// dbQuery = dbQuery.find({ tags: ['backend', 'frontend']}) // find entries that contains both tags
		// 	// dbQuery = dbQuery.or(orFilter)

		// }

		// Sort
		const sortBy = (query.sortBy+'').toLowerCase().replace(',', ' ')
		dbQuery = dbQuery.sort(sortBy)
		// dbQuery = dbQuery.sort('name')
		// dbQuery = dbQuery.sort({name: 1})

		// Fields to Select
		const fields = query.fields ? query.fields.split(',') : null
		if (fields) {
			dbQuery = dbQuery.select(fields)
			// dbQuery = dbQuery.select('name author')
			// dbQuery = dbQuery.select(['name', 'author'])
			// dbQuery = dbQuery.select({name: 1, author: 1})
		}

		// Execute the Query
		const result = await dbQuery

		// Return the result
		return res.json(result)
	} catch (error) {
		return res.status(400).json({error})
	}
})

app.post('/courses', async (req, res) => {
	try {
		const course = new Course(req.body)
		// await course.validate()
		const result = await course.save()
		return res.json(result)
	} catch (error) {
		console.log('Error!', error)
		return res.status(400).json(error)
	}
})

app.get('/courses/search', async (req, res) => {
	const validateRequest = (req) => {
		const {q, by, minPrice, type} = req.query
		if (type && !['or', 'and'].includes((type+'').toLowerCase())) {
			throw new Error('"type" must be OR or AND')
		}

		try {
			const val = parseFloat(minPrice)
		} catch (err) {
			throw new Error('"minPrice" must be float')
		}

		if (!Object.keys(courseSchema.obj).includes(by)) {
			throw new Error('Invalid "by" argument')
		}

		if (!q) {
			throw new Error('Query must not be empty')
		}
	}
	const {
		q, 
		by,
		minPrice,
		type // OR/AND
	} = req.query

	validateRequest(req)

	// q=by&by=name&minPrice=15&type=OR
	if ((type+'').toLowerCase() === 'or') {
		const orFilter = [{ [by]: { $regex: `.*${q}.*`, $options: 'i' } }, { price: { $gte: parseFloat(minPrice) } }]
		console.log(`returning OR - orFilter: ${JSON.stringify(orFilter, null, 2)}`)
		const result = await Course.find().or(orFilter)
		return res.json(result)
	} else {
		// it must be 'and', since at this
		// point the request is validated
		const filter = { [by]: { $regex: `.*${q}.*`, $options: 'i' }, price: { $gte: parseFloat(minPrice) } }
		return res.json(await Course.find(filter))
	}
})

app.get('/courses/:id', async (req, res) => {
	console.log(`Searching by ${req.params.id}`)
	// console.log('Find By ID:', Course.findById)
	const result = await Course.findById(req.params.id)
	// const result = await Course.findById('5a68fe2142ae6a6482c4c9cb')
	// const result = await Course.findOne({ _id: req.params.id })
	// const result = await Course.find( { "_id": "5a68fe2142ae6a6482c4c9cb" })
	// const result = await Course.find( { id: "5a68fe2142ae6a6482c4c9cb" })
	// const result = await Course.find()

	// const result = await Course.findOne({ _id: mongoose.Types.ObjectId("5a68fe2142ae6a6482c4c9cb") })
	console.log('result:', result)
	return res.json(result)

	// Course.findById(req.params.id).exec((err, course) => {
	// 	if (err) {
	// 		console.log('err:', err)
	// 	} else {
	// 		console.log('course:', course)
	// 	}

	// 	// console.log('Result!:', result)
	// 	return res.json(course)
	// })
})

app.put('/courses/:id', async (req, res) => {
	try {
		console.log('Validating inputs...')

		const {error} = validateCourseUpdatePayload(pickNotNil(req.body))

		if (error) {
			return res.status(400).json({
				message: 'Bad Request',
				error
			})
		}

		if (req.query.replace === 'true') {
			console.log('Replacing...')
			await (new Course).validate(req.body)
			const result = await Course.replaceOne({_id: req.params.id}, req.body)
			const course = await Course.findById(req.params.id)
			return res.json(course)
		}

		// Update: Update First Approach
		const {id} = req.params
		const result = await Course.findByIdAndUpdate(id, {
			$set: req.body
		}, { new: true })

		// // Update: Update First Approach
		// const {id} = req.params
		// const result = await Course.updateOne({ _id: id }, {
		// 	$set: req.body
		// })

		// // Update: Query First Approach
		// const {id} = req.params
		// console.log('Searching for the course...')
		// const course = await Course.findById(id)
		// if (!course) {
		// 	return res.status(404).json({ message: 'Course not found' })
		// }

		// console.log('Updating course...')
		// course.set(req.body)

		// const result = await course.save()
		// console.log('Course updated!', result)
		return res.json(result)
	} catch (error) {
		return res.status(400).json(error)
	}
})

app.delete('/courses/:id', async (req, res) => {
	const result = await Course.findByIdAndDelete(req.params.id) // retrns the deleted object
	// const result = await Course.deleteOne({ _id: req.params.id }) // don't return the object
	// const result = await Course.deleteMay({ isPublished: false }) // to delete many
	return res.json(result)
})

// start server
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}`))
