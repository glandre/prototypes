const mongoose = require('mongoose')
const {schema, validate} = require('./schema')
const {NOT_FOUND_ERROR} = require('../errors')

const Genre = mongoose.model('genres', schema)

const getAll = (q = null, sorted = false) => {
  let query = (q && (q+'').length > 0)
    ? Genre.find({
      name: {
        $regex: `.*${q}.*`,
        $options: 'i'
      }
    })
    : Genre.find()

  if (sorted && (sorted+'').toLowerCase() === 'true') {
    query = query.sort('name')
  }
  return query
}

const getById = (id) => {
	return Genre.findById(id)
}

const add = async (data) => {
	validate(data)
	const element = new Genre(data)
  await element.save()
	return element
}

const addAll = (array) => {
  if (!Array.isArray(array)) {
    throw new Error('Array of Genres Expected!')
  }
  return Genre.insertMany(array)
}

const update = (id, data) => {
	validate(data)
	return Genre.findByIdAndUpdate(id, { $set: data }, { new: true })
}

const deleteById = (id) => {
	return Genre.findByIdAndDelete(id)
}

module.exports = {
	getAll,
	getById,
	add,
  addAll,
	update,
	deleteById,
}