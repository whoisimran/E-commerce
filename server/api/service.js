const Users = require('../database/userdb');
const products = require('../database/productdb');
const orders = require('../database/booking');
const ratings = require('../database/review');
const payment = require('../database/payment');
var nodemailer = require('nodemailer');
// Code start from here .....

module.exports = {
    create_user: (data,callback)=>{
        let userDetails = new Users(data);
        userDetails.save((err, result) => {
            if(!err){
                return callback(null,result)
            }    
            else{
                return callback(null,err)
            }    
        });
    
    },
      login: (data,callback)=>{
        let email = data.email;
        Users.findOne({email:email},(err,result)=>{
            if(err){
                return callback(null,err);
            }else{
                return callback(null,result);
            }
        })
    },
    getuser: (callback)=>{
        Users.find((err,result)=>{
            if(err){
                return callback(null,err);
            }else{
                return callback(null,result);
            }
        })
    },
    getuserbyid: (_id,callback)=>{
        Users.findOne({_id},(err,result)=>{
            if(err){
                return callback(null,err);
            }else{
                return callback(null,result);
            }
        })
    },
    create_product: (data,callback)=>{
        let product = new products(data);
        product.save((err, result) => {
            if(!err){
                return callback(null,result)
            }    
            else{
                return callback(null,err)
            }    
        });
    
    },
    create_order: (data,callback)=>{
        let order = new orders(data);
        order.save((err, result) => {
            if(!err){
                return callback(null,result)
            }    
            else{
                return callback(null,err)
            }    
        });
    
    },
    getproduct: (callback)=>{
        products.find((err,result)=>{
            if(err){
                return callback(null, err)
            }else{
                return callback(null,result)
            }
        })
    },
    getproductbyid: (_id,callback)=>{
        products.findOne({_id},(err,result)=>{
            if(err){
                return callback(null,err);
            }else{
                return callback(null,result);
            }
        })
    },
     roomupdatebyid: (data,callback)=>{
        rooms.findByIdAndUpdate(data.id,data,(err,result)=>{
            if(err){
                return callback(null, err)
            }else{
                return callback(null,result)
            }
        })
    },
    getorder: (callback)=>{
        orders.find((err,result)=>{
            if(err){
                return callback(null, err)
            }else{
                return callback(null,result)
            }
        })
    },
    getorderbyid: (user_id,callback)=>{
        orders.find({user_id:user_id},(err,result)=>{
            if(err){
                return callback(null,err);
            }else{
                return callback(null,result);
            }
        })
    },
    orderupdatebyid: (data,callback)=>{
        orders.findByIdAndUpdate(data.id,data,(err,result)=>{
            if(err){
                return callback(null, err)
            }else{
                return callback(null,result)
            }
        })
    },
    create_rating: (data,callback)=>{
        let rating = new ratings(data);
        rating.save((err, result) => {
            if(!err){
                return callback(null,result)
            }    
            else{
                return callback(null,err)
            }    
        });
    
    },
    getratingbyid: (room_id,callback)=>{
        ratings.find({room_id:room_id},(err,result)=>{
            if(err){
                return callback(null,err);
            }else{
                return callback(null,result);
            }
        })
    },
    getallrating: (callback)=>{
        ratings.find((err,result)=>{
            if(err){
                return callback(null,err);
            }else{
                return callback(null,result);
            }
        })
    },
    getpayment: (callback)=>{
        payment.find((err,result)=>{
            if(err){
                return callback(null,err);
            }else{
                return callback(null,result);
            }
        })
    },
    sendmail: (data,callback)=>{
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'imran.techinfini@gmail.com',
              pass: 'itaipvrnpzaabhuj'
            }
          });

        var mailOptions = {
            from: data.from,
            to: data.to,
            subject: 'Regarding Product Status',
            html: `Your item has been <strong>${data.msg}</strong><br /> Please check the status <a href="http://localhost:3000/order" target="_blank">here</a>`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                return callback(null,err);
              
            } else {
              
              return callback(null,info.response);

            }
          });
    },
    // blogupdatebyid: (data,callback)=>{
    //     blogs.findByIdAndUpdate(data.id,data,(err,result)=>{
    //         if(err){
    //             return callback(null, err)
    //         }else{
    //             return callback(null,result)
    //         }
    //     })
    // },
    //  deleteblog: (id,callback)=>{
    //     blogs.findByIdAndDelete(id,(err,result)=>{
    //         if(err){
    //             return callback(null,err)
    //         }else{
    //             return callback(null,result);
    //         }
    //     })
    // },
    // getcomments: (b_Id,callback)=>{
    //     comments.find({b_Id},(err,result)=>{
    //         if(err){
    //             return callback(null,err);
    //         }else{
    //             return callback(null,result);
    //         }
    //     })
    // },


}