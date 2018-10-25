const express = require('express')
const model = require('./model')
const {getErrorResponse} = require('../errors')

const handle = (req, res, handler) => {
	try {
		return res.send(handler())
	} catch (err) {
		const {status, data} = getErrorResponse(err)
		return res.status(status).json(data)
	}
}

module.exports = () => {
	const api = express.Router()

	api.get('/', (req, res) => handle(req, res, model.getAll))
	api.post('/', (req, res) => handle(req, res, () => model.add(req.body)))
	api.get('/:id', (req, res) => handle(req, res, () => model.getById(parseInt(req.params.id))))
	api.put('/:id', (req, res) => handle(req, res, () => model.update(parseInt(req.params.id), req.body)))
	api.delete('/:id', (req, res) => handle(req, res, () => model.deleteById(parseInt(req.params.id))))

	return api
}
