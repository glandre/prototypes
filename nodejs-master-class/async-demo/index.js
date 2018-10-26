console.log('Before')

getUser(1)
	.then(user => getRepositories(user.gitHubUsername))
	.then(repos => Promise.all(repos.map(repo => getCommits(repo))))
	.then(commits => commits.map(c => console.log('Commits:', c)))
	.catch(err => console.log('Error', err.message))


async function displayCommits() {
	try {
		const user = await getUser(1)
		const repos = await getRepositories(user.gitHubUsername)
		const commits = await getCommits(repos[0])
		console.log('Commits', commits)
	} catch (err) {
		console.log('Error', err)
	}
}
displayCommits()

console.log('After') 

function getUser (id) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
		console.log('Reading a user from a database...')
		setTimeout(() => {
			resolve({id, gitHubUsername: 'glandre'})
		}, 2000)
	}, 500)
	})
}

function getRepositories(username) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
		console.log(`Fetching repositories from user: ${username}...`)
		setTimeout(() => {
			resolve(['repo1', 'repo2', 'repo3'])
			// reject(new Error('Boo!'))

		}, 2000)
	}, 500)
	})
}

function getCommits(repo) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
		console.log(`Fetching commits from repo: ${repo}...`)
		setTimeout(() => {
			resolve(['commit1', 'commit2', 'commit3'])
		}, 2000)
	}, 500)
	})
}
