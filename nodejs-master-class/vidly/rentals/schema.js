const Joi = require('joi')
const mongoose = require('mongoose')

const joiSchema = Joi.object().keys({
	movieId: Joi.string().min(24).max(24).required(),
	customerId: Joi.string().min(24).max(24).required()
})

const validate = (data, updating = false) => {
	console.log('movies.validate', {data})
	const {error} = Joi.validate(data, joiSchema)
	if (error) {
		console.log('movies.validate > throwing...')
		throw error
	}

	console.log('movies.validate > all good!')
}

const schema = new mongoose.Schema({
	movie: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'movies',
		required: true
	},
	customer: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'customers',
		required: true
	}
})

module.exports = {
	validate,
	schema
}
