const express = require('express');
const router = express.Router();



router.get('/',(req,res) => {
    res.send('User')
});


router.post('/',(req,res) => {
    res.send('User')
});

module.exports = router;