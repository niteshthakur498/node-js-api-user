const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cors = require('cors');
const PORT = process.env.PORT || 6000;

//Routes
const userRoutes = require('./api/routes/user.js');

const app = express();

//Body Parser Setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//Connecting to mongodb loaclhost database
mongoose.connect(process.env.MONGODB_URI||"mongodb://localhost:27017/user-api" ,{ useNewUrlParser: true });


mongoose.Promise = global.Promise;


app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin','*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if(req.method ==='OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});



app.use('/api/user',userRoutes);


app.get('/',(req,res) => {
    res.send('GET');
});




app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});


app.listen(PORT,(err) => {
    if(err) {
        console.log(err);
    }
    console.log(`Listening to ${PORT}`);
});
module.exports = app;