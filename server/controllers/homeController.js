const User = require('../models/Users');

module.exports.getHome = (req, res) => {
    res.send("Questa è la homepage");
} 

