const schema = require('./schema')
const {NOT_FOUND_ERROR} = require('../errors')

//----------DATA--------------------
const elements = [ 
  { id: 1, name: 'Action' },
  { id: 2, name: 'Action' },
  { id: 3, name: 'Action-comedy' },
  { id: 4, name: 'Adventure' },
  { id: 5, name: 'Adventure' },
  { id: 6, name: 'Animation' },
  { id: 7, name: 'Animation' },
  { id: 8, name: 'Biography' },
  { id: 9, name: 'Comedy' },
  { id: 10, name: 'Comedy' },
  { id: 11, name: 'Comedy-romance' },
  { id: 12, name: 'Crime' },
  { id: 13, name: 'Crime' },
  { id: 14, name: 'Documentary' },
  { id: 15, name: 'Drama' },
  { id: 16, name: 'Family' },
  { id: 17, name: 'Fantasy' },
  { id: 18, name: 'Fantasy' },
  { id: 19, name: 'Fantasy' },
  { id: 20, name: 'Film Noir' },
  { id: 21, name: 'History' },
  { id: 22, name: 'Horror' },
  { id: 23, name: 'Music' },
  { id: 24, name: 'Musical' },
  { id: 25, name: 'Mystery' },
  { id: 26, name: 'News' },
  { id: 27, name: 'Reality-TV' },
  { id: 28, name: 'Romance' },
  { id: 29, name: 'Sci-fi' },
  { id: 30, name: 'Superhero' },
  { id: 31, name: 'Thriller' },
  { id: 32, name: 'Ware' },
  { id: 33, name: 'Western' } 
]

let nextId = elements.length + 1
const uid = () => nextId++
//---------------------------------
const getAll = () => {
	return [...elements]
}

const getById = (id) => {
	const element = elements.find(e => e.id === id)
	if (!element) {
		throw new Error(NOT_FOUND_ERROR)
	}
	return element
}

const add = (data) => {
	schema.validate(data)
	const id = uid()
	const element = {...data, id}
	elements.push(element)
	return element
}

const update = (id, data) => {
	const index = elements.findIndex(e => e.id === id)
	if (index === -1) {
		throw new Error(NOT_FOUND_ERROR)
	}

	schema.validate(data)

	const element = {...elements[index], ...data}
	elements[index] = element

	return element
}

const deleteById = (id) => {
	const index = elements.findIndex(e => e.id === id)
	const element = elements[index]
	elements.splice(index, 1)
	return element
}

module.exports = {
	getAll,
	getById,
	add,
	update,
	deleteById,
}