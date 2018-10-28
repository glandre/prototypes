const Joi = require('joi')
const mongoose = require('mongoose')

const joiSchema = Joi.object({
	name: Joi.string().min(3).max(30).required()
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
		maxlength: 30,
		required: true
	}
})

module.exports = {
	validate,
	schema,
	joiSchema
}
