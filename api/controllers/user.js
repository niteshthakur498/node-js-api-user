const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.signup = (req,res,next) => {
    User.find({email: req.body.email})
        .exec()
        .then(user => {
            if(user.length >= 1){
                return res.status(409).json({
                    'message':'Mail Already Exists'
                });
            }else{
                bcrypt.hash(req.body.password,10,(err,hash) => {
                    if(err) {
                        return res.status(500).json({
                            error :'Yes'
                        });
                    }else{
                        const user = new User({
                            name: req.body.name,
                            email: req.body.email,
                            password: hash
                        });
                        user.save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    'message':'User Created'
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error : err
                                });
                            });
                            
                    }
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error : err
            });
        });
        
};


exports.listusers = (req,res,next) => {
    User.find({},{name:1,email:1})
        .exec()
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error:err
            })
        })
};

exports.deleteuser = (req, res, next) => {
    User.deleteOne({_id:req.params.id})
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                'message':'User Deleted'
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error:err
            });
        });

}


exports.login =(req,res,next) => {
    User.find({email:req.body.email})
        .exec()
        .then(user => {
            if(user.length < 1){
                return res.status(404).json({
                    'message':'Auth Failed'
                })
            }
            else{
                bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
                    if(err){
                        return res.status(404).json({
                            'message':'Auth Failed'
                        })
                    }
                    if(result){
                        const token = jwt.sign(
                            {
                                email:user[0].email,
                                userId:user[0]._id
                            },
                            'secret',
                            {
                                expiresIn:"1h"
                            }
                        )

                        return res.status(200).json({
                            message: "Auth successful",
                            token
                        });
                    }
                    res.status(401).json({
                        'message':'Auth Failed'
                    });
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                'message':'Auth Failed'
            });
        });
}