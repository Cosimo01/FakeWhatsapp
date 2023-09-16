const express = require('express');
const router = express.Router();
const { handleSignUp } = require('../controllers/registerController');   

router.post('/', handleSignUp);

module.exports = router