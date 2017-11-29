const mongoClient = require('mongodb').MongoClient;

mongoClient.connect('mongodb://localhost:27017/ToopApp', (err, db) => {
    if (err) {
        console.log('Unabled to connect to Mongo');
    }
    console.log('Connected to MongoDB server');
    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, results) => {
    //     if (err) {
    //         console.log('Unabled to insert To do ', err);
    //     }
    //     console.log(JSON.stringify(results.ops, undefined, 2));
    // });

    db.collection('Users').insertOne({
        name: 'Erwin',
        age: 34,
        location: 'El Salvador, San Salvador'
    }, (err, results) => {
        if (err) {
            console.log('Unabled to insert To do ', err);
        }
        console.log(JSON.stringify(results.ops, undefined, 2));
    });

    db.close();




});