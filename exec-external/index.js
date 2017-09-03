//
// Executes the command line interface for the program
//
(function run () {
  process.stdin.resume()
  process.stdin.setEncoding('utf8')

  console.log('Type a message to send:')

  var toContinue = true;

  // handle stdin read line events
  process.stdin.on('data', (chunk) => {
    try {
      const lines = chunk.split('\n')
      let transformers = []
      lines.forEach((line) => {
        try {
          if (line) {
            var exec = require('child_process').exec;
      			exec(`notify-send "${line}"`, function(error, stdout, stderror) {
      				console.log('error: ', error)
      				console.log('stdout: ', stdout)
      				console.log('stderror: ', stderror)
      			});
          }

          if (line === 'exit') {
	      	toContinue = false;
	      }

        } catch (error) {
          console.log('[' + line + ']: Error:' + error.message)
        }
      })
    } catch (error) {
      console.log(error.message || error)
    } finally {
      if (toContinue) {
      	console.log('Type a message to send:')
      } else {
      	process.exit(0)
      }
    }
  })
}())
