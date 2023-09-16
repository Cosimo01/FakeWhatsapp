const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('<h1>Error 404 page not found, return to <a href="/home">home page</a></h1>')
});

module.exports = router;