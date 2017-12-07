var mongoose = require('./../server/db/mongoose');
var {
    Todo
} = require('./../server/models/todo');



var id = "5a24d188e64d261980265bff";

Todo.find({
    _id: id
}).then((todos) => {
    console.log('Todos ', todos);
});

Todo.findOne({
    _id: id
}).then((todo) => {
    console.log('Todos ', todo);
});

Todo.findById({
    _id: id
}).then((todo) => {
    console.log('Todos by ID  ', todo);
});