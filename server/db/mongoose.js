const mongoose = require('mongoose');

mongoose.promise = global.Promise;
mongoose.connect('mongodb://evides:qaz123wsx@ds033196.mlab.com:33196/todos');

module.exports = {
    mongoose
};