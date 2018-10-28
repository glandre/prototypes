const mongoose = require('mongoose')
const {schema, validate} = require('./schema')
const {NOT_FOUND_ERROR, GENRE_NOT_FOUND_ERROR} = require('../errors')
const {pickNotNil} = require('../utils')
const Genre = require('../genres/model').Model

const Model = mongoose.model('movies', schema)

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

  return query.select('-__v')
}

const getById = async (id) => {
  return Model.findById(id)
    .select('-__v')
}

const add = async (data) => {
  validate(data)

  console.log('Data validated...')

  data = await transformGenre(data)

  const element = new Model(data)
  await element.save()
  console.log('returing element:', element)
  return element
}

const addAll = (array) => {
  if (!Array.isArray(array)) {
    throw new Error('Array of Models Expected!')
  }
  return Model.insertMany(array)
}

const update = async (id, data) => {
  validate(data, true)
  data = await transformGenre(data)
  return Model.findByIdAndUpdate(id, { $set: data }, { new: true })
    .select('-__v')
}

const deleteById = (id) => {
  return Model.findByIdAndDelete(id)
    .select('-__v')
}

//
// Helpers
//

const transformGenre = async (data) => {
  if (data.genre) {
    console.log('checking genre...')
    // check if genre exists
    const genre = await Genre.findOne({ name: data.genre.name })
    console.log('...genre:', genre)
    if (!genre) {
      console.log('throwing...', genre)
      throw new Error(GENRE_NOT_FOUND_ERROR)
    }

    // if it does: replace it with the one found in the database
    data.genre = null
    const { _id, name } = genre
    data = Object.assign({}, pickNotNil(data), { genre: { _id, name } })
    console.log('resulting data:', data)
  }
  return data
}

//
// Exports
//
module.exports = {
  getAll,
  getById,
  add,
  addAll,
  update,
  deleteById,
  Model
}