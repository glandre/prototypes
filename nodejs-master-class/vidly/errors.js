const NOT_FOUND_ERROR = 'errors/NOT_FOUND_ERROR'


const DEFAULT_STATUS = 400

Statuses = {
	[NOT_FOUND_ERROR]: 404
}

Messages = {
	[NOT_FOUND_ERROR]: 'Not Found'
}

const getErrorResponse = (error, defaultStatus = DEFAULT_STATUS) => {
	const {details, message} = error || {}
	
	let status = defaultStatus
	let data = {}

	if (details && details.length > 0) {
		const response =  {
			data: details.map(d => d.message),
			status: defaultStatus
		}
		return response
	}

	const response = {
		status: Statuses[message] || defaultStatus,
		data: Messages[message] || message
	}
	return response
}

module.exports = {
	NOT_FOUND_ERROR,
	getErrorResponse
}
