module.exports = (app) => {
  app.get('/api/person/:id', (req, res) => {
    res.json({ name: 'John', lastName: 'Doe' })
  });

  app.post('/api/person', (req, res) => {
    // save to the database
  });

  app.delete('/api/person/:id', (req, res) => {
    // delete from database
  });
}
