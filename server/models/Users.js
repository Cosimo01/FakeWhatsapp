const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    UserName: String,
    FirstName: String,
    LastName: String,
    Email: String,
    Password: String,
    SignUpDate: {type: Date, default: Date.now},
},{
    versionKey: false,
});

module.exports = mongoose.model('User', userSchema, 'users');