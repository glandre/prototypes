notifyCustomer()

async function notifyCustomer() {
	try {
		const customer = await getCustomer(1)
		console.log('Customer: ', customer)
		if (customer.isGold) {
			const movies = await getTopMovies()
			console.log('Top movies: ', movies)
			await sendEmail()
			console.log('Email sent...')
		}
	} catch (err) {
		console.log('Error', err)
	}
}

function getCustomer(id) {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve({
				id: 1,
				name: 'Geralds the Powerful',
				isGold: true,
				email: 'my@email.com'
			})
		}, 2000)

	})
}

function getTopMovies(id) {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve([
				'movie1',
				'movie2'
			])
		}, 2000)

	})
}

function sendEmail(id) {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve()
		}, 2000)

	})
}

// getCustomer(1, (customer) => {
// 	console.log('Customer: ', customer)
// 	if (customer.isGold) {
// 		getTopMovies((movies) => {
// 			console.log('Top movies: ', movies)
// 			sendEmail(customer.email, movies, () => {
// 				console.log('Email sent...')
// 			})
// 		})
// 	}
// })

// function getCustomer(id, callback) {
// 	setTimeout(() => {
// 		callback({
// 			id: 1,
// 			name: 'Geralds the Powerful',
// 			isGold: true,
// 			email: 'my@email.com'
// 		})
// 	}, 2000)
// }

// function getTopMovies(callback) {
// 	setTimeout(() => {
// 		callback([
// 			'movie1',
// 			'movie2'
// 		])
// 	}, 2000)
// }



// function sendEmail(email, movies, callback) {
// 	setTimeout(() => {
// 		callback()
// 	}, 2000)
// }
