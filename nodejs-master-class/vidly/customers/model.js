const mongoose = require('mongoose')
const {schema, validate} = require('./schema')
const {NOT_FOUND_ERROR} = require('../errors')

const Model = mongoose.model('customers', schema)

const getAll = (q = null, sorted = false) => {
  let query = (q && (q+'').length > 0)
    ? Model.find({
      name: {
        $regex: `.*${q}.*`,
        $options: 'i'
      }
    })
    : Model.find()

  if (sorted && (sorted+'').toLowerCase() === 'true') {
    query = query.sort('name')
  }
  return query
}

const getById = (id) => {
	return Model.findById(id)
}

const add = async (data) => {
	validate(data)
	const element = new Model(data)
  await element.save()
	return element
}

const addAll = (array) => {
  if (!Array.isArray(array)) {
    throw new Error('Array of Models Expected!')
  }
  return Model.insertMany(array)
}

const update = (id, data) => {
	validate(data)
	return Model.findByIdAndUpdate(id, { $set: data }, { new: true })
}

const deleteById = (id) => {
	return Model.findByIdAndDelete(id)
}

module.exports = {
	getAll,
	getById,
	add,
  addAll,
  update,
  deleteById,
  Model
}