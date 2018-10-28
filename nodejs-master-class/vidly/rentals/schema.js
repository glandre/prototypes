const Joi = require('../joi')
const mongoose = require('mongoose')

const joiSchema = Joi.object().keys({
	movieId: Joi.objectId().required(),
	customerId: Joi.objectId().required()
})

const validate = (data, updating = false) => {
	const {error} = Joi.validate(data, joiSchema)
	if (error) {
		throw error
	}
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
	},
	dateOut: {
		type: Date,
		required: true
	},
	dateReturned: {
		type: Date
	},
	rentalFee: {
		type: Number,
		min: 0
	}
})

module.exports = {
	validate,
	schema
}
