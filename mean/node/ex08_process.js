function hasParam(param) {
  return process.argv.indexOf(param) !== -1
}

if (hasParam('--production')) {
  console.log('Full attention!')
} else {
  console.log('No worries...')
}