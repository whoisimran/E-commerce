const mongoose = require('mongoose');

let order = new mongoose.Schema({

    user_id:{
        type: String,
        required: true
    },
    order:{
        type: String,
        require : true
    },
    fulfillment_status:{
        type: String,
        require: true
    }
   
});


const orders = mongoose.model("orders", order);

module.exports = orders;