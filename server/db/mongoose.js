const mongoose = require('mongoose');

mongoose.promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/TodoApp' || 'mongodb://evides:qaz123wsx@ds015584.mlab.com:15584/heroku_zz0b7j74');
mongoose.connect('mongodb://evides:qaz123wsx@ds015584.mlab.com:15584/heroku_zz0b7j74');
module.exports = {
    mongoose
};