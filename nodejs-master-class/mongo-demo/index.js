// MongoDB Compass

const mongoose = require('mongoose')

const dbUrl = process.env.MONGO_DEMO_CONNECTION_URL
mongoose.connect(dbUrl, { useNewUrlParser: true })
	.then(() => console.log('Connected to MongoDB...'))
	.catch(err => console.log('Could not connect to MongoDB...', err))

const courseSchema = new mongoose.Schema({
	name: String,
	author: String,
	tags: [ String ],
	date: { type: Date, default: Date.now },
	isPublished: Boolean
})

const Course = mongoose.model('Courses', courseSchema)

async function createCourse(data) {
	const course = new Course(data)

	try {
		const result = await course.save()
		console.log('result:', result)
	} catch (err) {
		console.log(err)
	}
}

// createCourse({
// 	name: 'Node JS Course',
// 	author: 'Mosh',
// 	tags: ['node', 'backend'],
// 	isPublished: true
// })

// createCourse({
// 	name: 'Angular Course',
// 	author: 'Mosh',
// 	tags: ['angular', 'frontend'],
// 	isPublished: true
// })

async function getCourses() {
	const pageNumber = 1 // 2
	const pageSize = 10

	// eq (equal)
	// ne (not equal)
	// gt (greater than)
	// gte (greater than or equal to)
	// lt (less than)
	// lte (less than or equal to)
	// in
	// nin (not in)
	const courses = await Course
		.find() // find all
		// .find({ price: 10 }) // find elements where price = 10
		// .find({ price: { $gte: 10, $lte: 20 }}) // find elements where price >= (gte) 10 AND price <= 20 (lte)
		// .find({ price: { $in: [10, 15, 20] } })
		// .find().or([{author: 'Mosh'}, {isPublished: true}]) // OR
		// .find({ author: 'Mosh', tags: { ??? } })
		// // Starts with Mosh
		// .find({ author: /^Mosh/i })
		// // Ends with
		// .find({ author: /Hamedani$/i})
		// // Contains
		// .find({ author: /.*Mosh.*/i})
		.skip((pageNumber - 1) * pageSize)
		.limit(pageSize)
		.sort({ name: 1 })
		.select({ name: 1, tags: 1 })
		// .countDocuments() // alternative to select: count is being deprecated
	console.log(courses)
}

getCourses()
