const Joi = require('joi')
const mongoose = require('mongoose')
const genres = require('../genres/schema')

const joiSchema = Joi.object({
	title: Joi.string().min(3).max(255).required(),
	genre: genres.joiSchema,
	numberInStock: Joi.number().min(0).required(),
	dailyRentalRate: Joi.number().min(0).required()
})

const validate = (data) => {
	console.log('movies.validate', {data})
	const {error} = Joi.validate(data, joiSchema)
	if (error) {
		console.log('movies.validate > throwing...')
		throw error
	}

	console.log('movies.validate > all good!')
}

const schema = new mongoose.Schema({
	title: {
		type: String,
		minlength: 3,
		maxlength: 255,
		required: true
	},
	genre: genres.schema,
	numberInStock: {
		type: Number,
		min: 0,
		required: true
	},
	dailyRentalRate: {
		type: Number,
		min: 0,
		required: true
	}
})

module.exports = {
	validate,
	schema
}
