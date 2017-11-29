const mongoClient = require('mongodb').MongoClient;

mongoClient.connect('mongodb://localhost:27017/ToopApp', (err, db) => {
    if (err) {
        console.log('Unabled to connect to Mongo');
    }
    console.log('Connected to MongoDB server');

    db.collection('Todos').find().toArray().then((docs) => {
        console.log('TODOS');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unabled to fetch Todos ', err);
    });

    db.close();




});