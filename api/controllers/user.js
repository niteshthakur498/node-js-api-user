const mongoose = require('mongoose');
const bcrypt = require("bcrypt-nodejs");
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
                // bcrypt.hash(req.body.password,10,null,(err,hash) => {
                //     if(err) {
                //         return res.status(500).json({
                //             error :'Yes'
                //         });
                //     }else{
                //         const user = new User({
                //             name: req.body.name,
                //             email: req.body.email,
                //             password: req.body.password
                //         });
                //         user.save()
                //             .then(result => {
                //                 console.log(result);
                //                 res.status(201).json({
                //                     'message':'User Created'
                //                 });
                //             })
                //             .catch(err => {
                //                 console.log(err);
                //                 res.status(500).json({
                //                     error : err
                //                 });
                //             });
                            
                //     }
                // });
                const user = new User({
                                name: req.body.name,
                                email: req.body.email,
                                password: req.body.password
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
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error : err
            });
        });
        
};




