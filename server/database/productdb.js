const mongoose = require('mongoose');

let product = new mongoose.Schema({
 
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: String,
        required: true
    },
    collections:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    date: {
        type: String,
        default: Date.now()
    }

});

const products = mongoose.model("products", product);

module.exports = products;