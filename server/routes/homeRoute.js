const express = require('express');
const router = express.Router();
const { getHome } = require('../controller/homeController');   

router.get('/', (req, res) => {
    res.redirect('/sign-in');
});

router.get('/sign-in', getHome);

module.exports = router