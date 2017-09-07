var Todos = require('../models/todos')

module.exports = (app) => {
  app.get('/api/setup/todos', (req, res) => {
    // seed database
    var starterTodos = [
      {
        username: 'test',
        todo: 'Buy milk',
        isDone: false,
        hasAttachment: false
      },
      {
        username: 'test',
        todo: 'Feed doc',
        isDone: false,
        hasAttachment: false
      },
      {
        username: 'test',
        todo: 'Learn Node',
        isDone: false,
        hasAttachment: false
      }
    ]

    Todos.create(starterTodos, (err, results) => {
      if (err) {
        throw err
      }
      res.send(results)
    })
  })

  app.get('/api/setup/todos/clear', (req, res) => {
    Todos.remove({}, (err) => {
      if (err) {
        throw err
      }
      res.send('Success')
    })
  })

  console.log('DEV ROUTES ENABLED')
}
