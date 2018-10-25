const Joi = require('joi')

const schema = Joi.object().keys({
	name: Joi.string().min(3).max(30).required()
})

const validate = (data) => {
	const {error} = Joi.validate(data, schema)
	if (error) {
		throw error
	}
}

module.exports = {
	validate
}
