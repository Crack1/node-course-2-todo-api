const express = require('express');
var bodyParser = require('body-parser');

var mongoose = require('./db/mongoose');
var {
    Todo
} = require('./models/todo');
var {
    User
} = require('./models/user');

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



app.listen(port, () => {
    console.log(`Server is working in port  ${port}`);
});