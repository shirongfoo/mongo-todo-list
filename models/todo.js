// Mongoose Schema and Models goes here
// Add a Mongoose schema and model to your `models/todo.js` file.


var mongoose = require('mongoose')
var mongooseSchema = new mongoose.Schema({
  name: String,
  description: String,
  completed: Boolean
})

var MongoTodo = mongoose.model('MongoTodo', mongooseSchema)


module.exports = MongoTodo
