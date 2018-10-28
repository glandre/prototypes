const Joi = require('../joi')
const mongoose = require('mongoose')
const genres = require('../genres/schema')

const joiSchema = (updating) => updating
	? Joi.object().keys({
		title: Joi.string().min(3).max(255),
		genre: genres.joiSchema,
		numberInStock: Joi.number().min(0).max(255),
		dailyRentalRate: Joi.number().min(0).max(255)
	})
	: Joi.object().keys({
		title: Joi.string().min(3).max(255).required(),
		genre: genres.joiSchema,
		numberInStock: Joi.number().min(0).max(255).required(),
		dailyRentalRate: Joi.number().min(0).max(255).required()
	})

const validate = (data, updating = false) => {
	console.log('movies.validate', {data})
	const {error} = Joi.validate(data, joiSchema(updating))
	if (error) {
		console.log('movies.validate > throwing...')
		throw error
	}

	console.log('movies.validate > all good!')
}

const schema = new mongoose.Schema({
	title: {
		type: String,
		trim: true,
		minlength: 3,
		maxlength: 255,
		required: true
	},
	genre: {
		type: genres.schema,
		required: true
	},
	numberInStock: {
		type: Number,
		min: 0,
		max: 255,
		required: true
	},
	dailyRentalRate: {
		type: Number,
		min: 0,
		max: 255,
		required: true
	}
})

module.exports = {
	validate,
	schema
}
