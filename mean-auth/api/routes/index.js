var express = require('express')
var router = express.Router()
var jwt = require('express-jwt')

var ctrlProfile = require('../controllers/profile')
var ctrlAuth = require('../controllers/authentication')

var auth = jwt({
	secret: 'MY_SECRET',
	userProperty: 'payload'
})

router.get('/', (req, res) => res.send(200, 'it works!'))

// // profile
// router.get('/profile', auth, ctrlProfile.profileRead)

// // authentication
// router.post('/register', ctrlAuth.register)
// router.post('/login', ctrlAuth.login)

module.exports = router