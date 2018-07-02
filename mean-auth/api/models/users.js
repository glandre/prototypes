var crypto = require('crypto')

function setPassword(pwd) {
	const salt = crypto.randomBytes(16).toString('hex')
	const hash = crypto.pbkdf2Sync(password, salt, 1000, 64).toString('hex')
	return {salt, hash}
}

function validPassword(user, pwd) {
	const hash = crypto.pbkdf2Sync(pwd, user.salt, 1000, 64).toString('hex')
	return user.hash === hash
}

const name = 'admin'
const password = 'admin'
const {salt, hash} = setPassword(password)

module.exports = [
	{ name, salt, hash }
]