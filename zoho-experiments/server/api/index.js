// import { Router } from 'express'
const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

const ping = require('./ping')
const zoho = require('./zoho')
const events = require('./events')
const eventReport = require('./event-report')

// use application/json parser
router.use(bodyParser.json())

ping('/ping', router)
ping('/hello', router)
eventReport('/event-report', router)
events('/events', router)
zoho('/zoho', router)

module.exports = router