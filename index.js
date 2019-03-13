const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = process.env.PORT || 4000;

//Routes
const userRoutes = require('./api/routes/user.js');





const app = express();

//Connecting to mongodb loaclhost database
mongoose.connect(process.env.MONGODB_URI||"mongodb://localhost:27017/user-api" ,{ useNewUrlParser: true });



app.use('/user',userRoutes);


app.get('/',(req,res) => {
    res.send('GET');
});





app.listen(PORT,() => console.log(`Listening to ${PORT}`));
module.exports = app;