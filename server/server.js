const express = require('express');
var bodyParser = require('body-parser');
const _ = require('lodash');
var {
    authenticate
} = require('./midleware/authenticate');

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

app.post('/todos', authenticate, (req, res) => {
    var todo = new Todo({
        text: req.body.text,
        completed: req.body.completed,
        completedat: req.body.completedat,
        _creator: req.user._id
    });
    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.send(e);
    });
});

app.get('/todos', authenticate, (req, res) => {
    Todo.find({
        _creator: req.user._id
    }).then((todos) => {
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


app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;
    console.log(id);
    if (!ObjectID.isValid(id)) {
        console.log('ObjectId is not valid');
        return res.status(404).send();
    }

    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send(todo);
    }).catch((e) => {
        return res.status(404).send();

    });

});


app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);


    if (!ObjectID.isValid(id)) {
        console.log('ObjectId is not valid');
        return res.status(404).send();
    }
    if (_.isBoolean(body.completed) && body.completed) {
        body.completedat = new Date().getTime();
    } else {
        body.completed = false;
        body.completedat = null;
    }

    console.log(body);
    Todo.findByIdAndUpdate(id, {
        $set: body
    }, {
        new: true
    }).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send(todo);
    }).catch((e) => {
        return res.status(404).send();

    });
});



app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);
    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    });
});



app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

app.post('/users/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        });
    }).catch((e) => {
        res.status(400).send();
    })
})

app.delete('/users/me/token', authenticate, (req, res) => {
    User.removeToken(req.token).then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    });
});

app.listen(port, () => {
    console.log(`Server is working in port  ${port}`);
});

module.exports = {
    app
};