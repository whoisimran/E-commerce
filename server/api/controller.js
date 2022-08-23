const {create_user,login,getuser, getuserbyid,create_product,create_order,getproduct,getproductbyid,roomupdatebyid,getorder,getorderbyid,orderupdatebyid,sendmail,create_rating,getratingbyid,getallrating,getpayment} = require('./service');

module.exports = {
    create_user: (req,res,next)=>{  
        let body = req.body;
        create_user(body,(err,result)=>{
            if(err){
                res.status(400).json({success:false,message: err})
            }else{
                res.status(200).json({success:true,message: result})

            }
        })
    },
    login: (req,res)=>{
        let body = req.body;
        login(body,(err,result)=>{
            if(err){
                res.status(400).json({success:false,message:err})
            }else{
                if(!result){
                    res.status(400).json({success:false,message:'Invalid Login Details!'})
                }else{
                    if(body.password == result.password){
                        res.status(200).json({success:true, message:result})
                    }else{
                        res.status(400).json({success:false, message:'Invalid Login Details!'})

                    }

                }
            }
        })

    },
    getuser: (req,res)=>{
        getuser((err,result)=>{
            if(err){
                res.status(400).json({success:false,message:err})
            }else{
               
                res.status(200).json({success:true,message:result})
            }
        })
    },
    getuserbyid: (req,res)=>{
        let _id = req.params.id;
        getuserbyid(_id,(err,result)=>{
            if(err){
                res.status(400).json({success:false,message:err})
            }else{
                if(!result){
                    res.status(400).json({success:false,message:'user Not found'})
                }else{
                res.status(200).json({success:true, message:result})

                }
            }
        })

    },
    create_product: (req,res)=>{
        let body = req.body;
        create_product(body,(err,result)=>{
            if(err){
                res.status(400).json({success:false,message: err})
            }else{
                res.status(200).json({success:true,message: result})

            }
        })
    },
    create_order: (req,res)=>{
        let body = req.body;
        create_order(body,(err,result)=>{
            if(err){
                res.status(400).json({success:false,message: err})
            }else{
                res.status(200).json({success:true,message: result})

            }
        })
    },
    getproduct: (req,res)=>{
        getproduct((err,result)=>{
            if(err){
                res.status(400).json({success:false,message:err})
            }else{
               
                res.status(200).json({success:true,message:result})
            }
        })
    },
    getproductbyid: (req,res)=>{
        let _id = req.params.id;
        getproductbyid(_id,(err,result)=>{
            if(err){
                res.status(400).json({success:false,message:err})
            }else{
                if(!result){
                    res.status(400).json({success:false,message:'user Not found'})
                }else{
                res.status(200).json({success:true, message:result})

                }
            }
        })

    },
    roomupdatebyid: (req,res)=>{
        let id = req.params.id;
        let body = req.body;
        body.id = id;
        roomupdatebyid(body,(err,result)=>{
            if(err){
                res.status(400).json({success:false,message:err})
            }else{
                if(!result){
                    res.status(400).json({success:false,message:false})
                }else{
                res.status(200).json({success:true, message:result})

                }
            }
        })
    },    
    getorder: (req,res)=>{
        getorder((err,result)=>{
            if(err){
                res.status(400).json({success:false,message:err})
            }else{
               
                res.status(200).json({success:true,message:result})
            }
        })
    },
    getorderbyid: (req,res)=>{
        let user_id = req.params.user_id;
        getorderbyid(user_id,(err,result)=>{
            if(err){
                res.status(400).json({success:false,message:err})
            }else{
                if(!result){
                    res.status(400).json({success:false,message:false})
                }else{
                res.status(200).json({success:true, message:result})

                }
            }
        })

    },
    orderupdatebyid: (req,res)=>{
        let id = req.params.id;
        let body = req.body;
        body.id = id;
        orderupdatebyid(body,(err,result)=>{
            if(err){
                res.status(400).json({success:false,message:err})
            }else{
                if(!result){
                    res.status(400).json({success:false,message:false})
                }else{
                res.status(200).json({success:true, message:result})

                }
            }
        })
    },
    sendmail: (req,res)=>{
        let body = req.body;
        sendmail(body,(err,result)=>{
            if(err){
                res.status(400).json({success:false,message:err})
            }else{
                res.status(400).json({success:true,message:'Mail has been sent!'})

            }
        })
    },
    create_rating: (req,res)=>{  
        let body = req.body;
        create_rating(body,(err,result)=>{
            if(err){
                res.status(400).json({success:false,message: err})
            }else{
                res.status(200).json({success:true,message: result})

            }
        })
    },
    getratingbyid: (req,res)=>{
        let room_id = req.params.room_id;
        getratingbyid(room_id,(err,result)=>{
            if(err){
                res.status(400).json({success:false,message:err})
            }else{
                if(!result){
                    res.status(400).json({success:false,message:'rating Not found'})
                }else{
                res.status(200).json({success:true, message:result})

                }
            }
        })

    },
    getallrating: (req,res)=>{
        // let room_id = req.params.room_id;
        getallrating((err,result)=>{
            if(err){
                res.status(400).json({success:false,message:err})
            }else{
                if(!result){
                    res.status(400).json({success:false,message:'rating Not found'})
                }else{
                res.status(200).json({success:true, message:result})

                }
            }
        })

    },
    getpayment: (req,res)=>{
        // let room_id = req.params.room_id;
        getpayment((err,result)=>{
            if(err){
                res.status(400).json({success:false,message:err})
            }else{
                if(!result){
                    res.status(400).json({success:false,message:'Payment Not found'})
                }else{
                res.status(200).json({success:true, message:result})

                }
            }
        })

    }
    // blogupdatebyid: (req,res)=>{
    //     let id = req.params.id;
    //     let body = req.body;
    //     body.id = id;
    //     blogupdatebyid(body,(err,result)=>{
    //         if(err){
    //             res.status(400).json({success:false,message:err})
    //         }else{
    //             if(!result){
    //                 res.status(400).json({success:false,message:'Blog Not found'})
    //             }else{
    //             res.status(200).json({success:true, message:result})

    //             }
    //         }
    //     })

    // },
    // deleteblog: (req,res)=>{
    //     let id = req.params.id;
    //     deleteblog(id,(err,result)=>{
    //         if(err){
    //             res.status(400).json({success:false,message:err})
    //         }else{
    //             if(!result){
    //                 res.status(400).json({success:false,message:'Blog Not found'})
    //             }else{createComment
    //             res.status(200).json({success:true, message:result})

    //             }
    //         }
    //     })
    // },
    // getcomments: (req,res)=>{
    //     let b_Id = req.params.b_Id;
    //     getcomments(b_Id,(err,result)=>{
    //         if(err){
    //             res.status(400).json({success:false,message:err})
    //         }else{
    //             if(!result){
    //                 res.status(400).json({success:false,message:'Comments Not found'})
    //             }else{
    //             res.status(200).json({success:true, message:result})

    //             }
    //         }
    //     })

    // }

}