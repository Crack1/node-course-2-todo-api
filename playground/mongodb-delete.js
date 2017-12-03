const mongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

mongoClient.connect('mongodb://localhost:27017/ToopApp', (err, db) => {
    if (err) {
        console.log('Unabled to connect to Mongo');
    }
    console.log('Connected to MongoDB server');

    // //delete many
    // db.collection('Todos').deleteMany({
    //     text: 'Eat Lunch'
    // }).then((result) => {
    //     console.log(result);
    // });
    //delete many
    // db.collection('Todos').deleteOne({
    //     text: 'Eat Lunch'
    // }).then((result) => {
    //     console.log(result);
    // });
    db.collection('Todos').findOneAndDelete({
        _id: ObjectId("5a1f86d12eb340b82c74f534")
    }).then((result) => {
        console.log(result);
    });


    db.close();




});