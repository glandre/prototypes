const _ = require('lodash')

const students = [
  {
    name: 'João',
    grade: 7.6
  },
  {
    name: 'Maria',
    grade: 8.6
  },
  {
    name: 'Pedro',
    grade: 8.1
  }
]

const avg = _.sumBy(students, 'grade') / students.length
console.log(avg)