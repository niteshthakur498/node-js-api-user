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
app.use('/api/user',userRoutes);


app.get('/',(req,res) => {
    res.send('GET');
});





app.listen(PORT,(err) => {
    if(err) {
        console.log(err);
    }
    console.log(`Listening to ${PORT}`);
});
module.exports = app;