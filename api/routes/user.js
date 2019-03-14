const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');



router.post('/signup',userController.signup);
router.get('/listusers',userController.listusers);
router.get('/deleteuser/:id',userController.deleteuser);

module.exports = router;