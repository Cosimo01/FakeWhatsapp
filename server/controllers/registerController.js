const mongoose = require('mongoose');
const { secondsInHour } = require('date-fns');
const User = require('../models/Users');
const argon2 = require('argon2');


module.exports.handleSignUp = async (req, res) => {
    const {Username, FirstName, LastName, Email, Password} = req.body;
    console.log(`${Username}, ${FirstName}, ${LastName}, ${Email}, ${Password}`)

    if(!Username || !FirstName || !LastName || !Email || !Password) {
        return res.status(400).json({ message: 'È richiesta la compilazione di tutti i campi.' })
    }

    try {
        const foundUser = await User.findOne({ "Email": Email }).exec();
    
        if(foundUser) {
            return res.status(409).json({message: "Il nome utente esiste già"});
        }
    
        const hashedPassword = await argon2.hash(Password);
        
        const isCreated = await User.create({
            UserName: Username,
            FirstName,
            LastName,
            Email,
            Password: hashedPassword,
        })
    
        if (!isCreated) {
            return res.status(500).json({message: "error"});
        } else {
            console.log("")
            return res.status(200).json({message:"ok"});
        }
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}