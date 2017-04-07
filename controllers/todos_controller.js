// TODO. import TODO Model ;-)

var mongoose = require('mongoose')
var dbURI = 'mongodb://localhost/mongo-todo-list'
const TodoModule = require('../models/todo')
mongoose.connect(dbURI)
mongoose.Promise = global.Promise

function create (params) {
  // create a new TODO and console log the response
  var newTodo = new TodoModule()
  if (!newTodo.description || newTodo.description == '') {
    newTodo.description = 'my description'
  }
  if (!newTodo.completed || newTodo.completed == '') {
    newTodo.completed = false
  }
  if (newTodo.name && newTodo.name.length >= 5) {
    newTodo.name = params.name
    newTodo.description = params.description
    newTodo.completed = params.completed
    newTodo.save(function (err) {
      if (err)console.error(err)
      console.log(newTodo + ' is saved')
      mongoose.disconnect()
    })
  }
}

function list () {
  return TodoModule.find({})
}

function show (id) {
  // find the TODO with this id and console log it
  TodoModule.findById({_id: id}, function (err, doc) {
    if (err)console.error(err)
    console.log(doc)
  })
}

function update (id, params) {
  // find the TODO with this id and update it's params. console log the result.
  var object = show(id)
  if (show(id) === null) {
    return false
  } else if (params.name.length >= 5 && params.name !== '') {
    for (var key in params) {
      object.key = params.key
    }
    object.save(function (err) {
      if (err)console.error(err)
      console.log(object + ' is updated')
      mongoose.disconnect()
    })
  } else {
    return false
  }
}

function destroy (id) {
  // find the TODO with this id and destroy it. console log success/failure.
  if(show(id) === null){
    return false
  } else {
    TodoModule.findByIdAndRemove(id, function(err, doc){
      if(err) console.error(err)
      console.log('object is deleted');
    })
  }
}

module.exports = {
  create,
  list,
  show,
  update,
  destroy
}
