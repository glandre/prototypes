var Todos = require('../models/todos')

module.exports = (app) => {

  app.get('/api/todos/:username', (req, res) => {
    const { username } = req.params
    Todos.find({ username }, (err, todos) => {
      if (err) {
        throw err
      }
      res.send(todos)
    })
  })

  app.get('/api/todo/:id', (req, res) => {
    Todos.findById({ _id: req.params.id }, (err, todo) => {
      if (err) {
        throw err
      }
      res.send(todo)
    })
  })

  app.post('/api/todo', (req, res) => {
    const { id, todo, isDone, hasAttachment } = req.body
    if (id) {
      console.log('id:', id)
      // updating
      Todos.findByIdAndUpdate(req.body.id, {
        todo,
        isDone,
        hasAttachment
      }, (err) => {
        console.log('db finished!')
        if (err) {
          throw err
        }
        console.log('sending response...')
        res.send('Sucess')
      })
    } else {
      console.log('no id...')
      // creating
      var newTodo = Todos({
        username: 'test',
        todo,
        isDone,
        hasAttachment
      })

      newTodo.save((err) => {
        if (err) {
          throw err
        }
        res.send('Sucess')
      })
    }
  })

  app.delete('/api/todo', (req, res) => {
    Todos.findByIdAndRemove(req.body.id, (err) => {
      if (err) {
        throw err
      }
      res.send('Success')
    })
  })
}
