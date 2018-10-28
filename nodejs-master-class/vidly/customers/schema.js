const Joi = require('../joi')
const mongoose = require('mongoose')

const joiSchema = Joi.object().keys({
	name: Joi.string().min(3).max(255).required(),
	phone: Joi.string().min(9).max(15).required(),
	isGold: Joi.boolean()
})

const validate = (data) => {
	const {error} = Joi.validate(data, joiSchema)
	if (error) {
		throw error
	}
}

const schema = new mongoose.Schema({
	name: {
		type: String,
		minlength: 3,
		maxlength: 255,
		required: true
	},
	phone: {
		type: String,
		minlength: 9,
		maxlength: 15,
		required: true
	},
	isGold: {
		type: Boolean,
		default: false
	}
})

module.exports = {
	validate,
	schema
}
