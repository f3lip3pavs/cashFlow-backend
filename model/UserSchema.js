const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

var userModel = mongoose.model('userModel', userSchema);

module.exports = userModel;

