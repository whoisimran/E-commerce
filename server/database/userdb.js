const mongoose = require('mongoose');

let user = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        required: true,
        default: 'user'
    },
    mobile:{
        type: String,
        required: true
    },
    date: {
        type: String,
        default: Date.now()
    }

});


const users = mongoose.model("users", user);

module.exports = users;