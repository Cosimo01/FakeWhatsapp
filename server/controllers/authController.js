const Users = require('../models/Users');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
require('dotenv').config();


module.exports.handleLogin = async (req, res) => {
    const { user, password } = req.body;
    console.log('\n' + `Email: ${user} | Password: ${password}`);

    if (!user || !password) {
        return res.status(400).json({ message: 'È richiesta la compilazione di tutti i campi.' })
    }

    try {
        // Cerca l'utente nel database per email
        const foundUser = await Users.findOne({
            $or: [
                { "Email": user },
                { "UserName": user }
            ]
        }).exec();

        console.log(foundUser)

        // Se non trova l'utente, restituisce lo stato "unauthorized"
        if (!foundUser) {
            console.log('Email o Username non corretti\n');
            return res.status(401).json({ message: 'Non autorizzato' });
        }

        // Verifica della corrispondenza delle password
        const isMatch = await argon2.verify(foundUser.Password, password);

        if (!isMatch) {
            // Se le password non combaciano restituisce lo stato "unauthorized"
            console.log('Password non corretta');
            return res.status(401).json({ message: 'Non autorizzato' });
        }

        const accessToken = jwt.sign(
            { _id: foundUser._id, UserName: foundUser.UserName, Email: foundUser.Email },
            process.env.ACCESS_SECRET_TOKEN,
            { expiresIn: '20m' }
        );

        const refreshToken = jwt.sign(
            { _id: foundUser._id, UserName: foundUser.UserName, Email: foundUser.Email },
            process.env.REFRESH_SECRET_TOKEN,
            { expiresIn: '3m' }
        );
        console.log('\nToken generati');

        console.log("Accesso autorizzato");
        res.json({ success: true, accessToken, UserName: foundUser.UserName });
    } catch (error) {
        console.error('Errore nella ricerca dell\'utente:', error);
        return res.status(500).send('Errore nella ricerca dell\'utente');
    }
}


// passwords:
/*
pippocona: Porcodio.33

lacodeina: prova1234

neurogaymancer: IlDiocane-0dC
*/