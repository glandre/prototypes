const express = require('express')
const model = require('./model')
const {getErrorResponse} = require('../errors')

const handle = async (req, res, handler) => {
	try {
		return res.json(await handler())
	} catch (err) {
		const {status, data} = getErrorResponse(err)
		return res.status(status).json(data)
	}
}

module.exports = () => {
	const api = express.Router()

	api.get('/', (req, res) => handle(req, res, () => model.getAll(req.query.q, req.query.sorted)))
	api.post('/', (req, res) => handle(req, res, () => model.add(req.body)))
	api.post('/all', (req, res) => handle(req, res, () => model.addAll(req.body)))
	api.get('/:id', (req, res) => handle(req, res, () => model.getById(req.params.id)))
	api.put('/:id', (req, res) => handle(req, res, () => model.update(req.params.id, req.body)))
	api.delete('/:id', (req, res) => handle(req, res, () => model.deleteById(req.params.id)))

	return api
}
