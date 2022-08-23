const mongoose = require('mongoose');

let payment = new mongoose.Schema({
    token_id:{
        type: String,
        required: true
    },
    room_id:{
        type: String,
        required: true
    },
    customer:{
        type: String,
        require : true
    },
    charge:{
        type: String,
        require : true
    }, 
    status:{
        type: String,
        required: true
    },
    receipt_url:{
        type: String,
        required: true
    },
    date: {
        type: String,
        default: Date.now()
    }

});


const payments = mongoose.model("payments", payment);

module.exports = payments;