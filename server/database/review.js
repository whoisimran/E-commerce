const mongoose = require('mongoose');

let review = new mongoose.Schema({

    room_id:{
        type: String,
        required: true
    },
    user_id:{
        type: String,
        required: true
    },
    user_name:{
        type: String,
        required: true
    },
    review:{
        type: String,
        require : true
    }, 
    rating:{
        type: Number,
        require : true
    },
    date: {
        type: String,
        default: Date.now()
    }

});


const reviews = mongoose.model("reviews", review);

module.exports = reviews;