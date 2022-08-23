const express = require('express')
var nodemailer = require('nodemailer');
const app = express()
const cors = require('cors');
const mongoose = require('mongoose');
const stripe = require('stripe')('sk_test_51JtRscSJHOjmNjIWtWPvdY0KSLkyRZup0AL4VxzriCosNy4eECIreMg0p9IT0KbOLJdoW1TlzLvOkRJPk03SwBeM00ytOOpMoT');
const Router = require('./api/router')
const uuid = require('uuid').v4
const payments = require('./database/payment')


const port = 8080

const username = 'imran';
const password = 'imran';
const cluster = 'cluster0.hepmj';
const dbName = 'shopping';

app.use(express.json());
app.use(express.urlencoded({extended:true}));


//Create Connection and new Db
mongoose.connect(
    `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbName}`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('Mongoose Connection successful')
    }).catch((err) => {
        console.log(`no connectoin error -> ${err}`)
    });

app.use(cors());

app.use(Router)


// checkout API code...

app.post('/checkout',async(req,res)=>{
  
    try{
       const product= req.body.product;
       const token= req.body.token;

       const customer = await stripe.customers.create({
          email: token.email,
          source: token.id
       })
       const idempotency_key = uuid();
       const charge = await stripe.charges.create(
         {
           amount: product.price,
           currency: "usd",
           customer: customer.id,
           receipt_email: token.email,
           description: `Booked - ${product.title}`,
           shipping: {
             name: token.card.name,
             address: {
               line1: token.card.address_line1,
               line2: token.card.address_line2,
               city: token.card.address_city,
               country: token.card.address_country,
               postal_code: token.card.address_zip,
             },
           },
         },
         {
           idempotency_key,
         }
       );
       // console.log("Charge:", { charge });
      
       let customer_json = JSON.stringify(customer);
       let charge_json = JSON.stringify(charge)
       console.log(charge);
 
       let payment = new payments({token_id:charge.id,room_id:product._id,customer:customer_json,charge:charge_json,status:charge.status,receipt_url:charge.receipt_url});
       payment.save((err, result) => {
             if(!err){
                res.status(200).json({success:true,message:charge})
                
             }    
             else{
              res.status(400).json({success:false,message:err})
              
             }    
         });
 
    }catch(error){
      //  console.error("Error:", error);
    //    status = "failure";
    res.status(400).json({success:false,message:error})

    }
 
    // res.json({ error, status });
 })


 //sending mail






app.get('/', (req, res) => res.send('Hello World!!!!!!!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))