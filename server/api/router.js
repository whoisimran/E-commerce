const {create_user,login,getuser,getuserbyid,create_product,getproduct,getproductbyid,roomupdatebyid,create_order,getorder,getorderbyid,sendmail,orderupdatebyid,create_rating,getratingbyid,getallrating,getpayment} = require('./controller');
const Router = require('express').Router();

// ########### Create a User API #############
Router.post('/api/user',create_user);

// ########### Login a user API  #############
Router.post('/api/user/login',login);

// ########### Get All users API  #############
Router.get('/api/user',getuser);

// ########### Get  user By Id API  #############
Router.get('/api/user/:id',getuserbyid);

// ########### Create a Product API  #############
Router.post('/api/product',create_product);

// ########### Get  All product API  #############
Router.get('/api/product',getproduct);

// ########### Get  product By Id  #############
Router.get('/api/product/:id',getproductbyid);

// ########### Update  Room By Id  #############
Router.patch('/api/room/:id',roomupdatebyid);

// ########### Create a Order API  #############
Router.post('/api/order',create_order);

// ########### Get All Order API  #############
Router.get('/api/order',getorder);


// ########### Get Order By user Id API  #############
Router.get('/api/order/:user_id',getorderbyid);


// ########### Update Order by  Id  #############
Router.patch('/api/order/:id',orderupdatebyid);

// post rating API

Router.post('/api/rating',create_rating);

Router.get('/api/rating/:room_id',getratingbyid);

Router.post('/api/sendmail',sendmail);

Router.get('/api/rating',getallrating)

Router.get('/api/payment',getpayment);

// Router.patch('/api/blog/:id',blogupdatebyid);
// Router.delete('/api/blog/:id',deleteblog);


module.exports = Router;