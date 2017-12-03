const mongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

mongoClient.connect('mongodb://localhost:27017/ToopApp', (err, db) => {
    if (err) {
        console.log('Unabled to connect to Mongo');
    }
    console.log('Connected to MongoDB server');

    db.collection('Todos').findOneAndUpdate({
            _id: ObjectId("5a1e4698fc28391a64bde36a")
        }, {
            $set: {
                completed: true
            }
        }, {
            returnOriginal: false
        })
        .then((result) => {
            console.log(result);
        });


    db.close();




});