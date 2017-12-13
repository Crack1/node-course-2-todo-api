const express = require('express');
var bodyParser = require('body-parser');

var mongoose = require('./db/mongoose');
var {
    Todo
} = require('./models/todo');
var {
    User
} = require('./models/user');

var {
    ObjectID
} = require('mongodb');

const port = process.env.PORT || 3000;
var app = express();


app.use(bodyParser.json());
app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text,
        completed: req.body.completed,
        completedat: req.body.completedat
    });
    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.send(e);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({
            todos
        })
    }, (e) => {
        res.status(400).send(e);

    });
});


app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        console.log('ObjectId is not valid');
        return res.status(404).send();
    }
    Todo.findById(id).then((todo) => {
        res.send({
            todo
        })
    }, (e) => {
        res.status(400).send(e);

    });
});



app.listen(port, () => {
    console.log(`Server is working in port  ${port}`);
});

module.exports = {
    app
};