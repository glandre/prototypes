const NOT_FOUND_ERROR = 'errors/NOT_FOUND_ERROR'
const CUSTOMER_NOT_FOUND_ERROR = 'errors/CUSTOMER_NOT_FOUND_ERROR'
const GENRE_NOT_FOUND_ERROR = 'errors/GENRE_NOT_FOUND_ERROR'
const MOVIE_NOT_FOUND_ERROR = 'errors/MOVIE_NOT_FOUND_ERROR'
const MOVIE_NOT_IN_STOCK_ERROR = 'errors/MOVIE_NOT_IN_STOCK_ERROR'


const DEFAULT_STATUS = 400

Statuses = {
	// General Errors
	[NOT_FOUND_ERROR]: 404,

	// Customer Errors
	[CUSTOMER_NOT_FOUND_ERROR]: 404,

	// Genre Errors
	[GENRE_NOT_FOUND_ERROR]: 404,

	// Movie Errors
	[MOVIE_NOT_IN_STOCK_ERROR]: 403,
	[MOVIE_NOT_FOUND_ERROR]: 404,
}

Messages = {
	[NOT_FOUND_ERROR]: 'Not Found',
	[CUSTOMER_NOT_FOUND_ERROR]: 'Customer Not Found',
	[GENRE_NOT_FOUND_ERROR]: 'Genre Not Found',
	[MOVIE_NOT_FOUND_ERROR]: 'Movie Not Found',
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
	CUSTOMER_NOT_FOUND_ERROR,
	GENRE_NOT_FOUND_ERROR,
	MOVIE_NOT_FOUND_ERROR,
	MOVIE_NOT_IN_STOCK_ERROR,
	NOT_FOUND_ERROR,
	getErrorResponse
}
