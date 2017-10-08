process.stdout.write('Are you enjoying the course? ')
process.stdin.on('data', function (data) {
  process.stdout.write(`Your answer was ${data.toString()}Obrigado!\n`)
  process.exit()
})