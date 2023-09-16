const Friendships = require('../models/Friendships');
const Users = require('../models/Users');

module.exports.addFriend = async (req, res) => {
    try {
        const myUsername = req.params.UserName;
        const searchTerm = req.query.friendRequestTo;
        console.log(searchTerm);

        const foundUser = await Users.findOne({ "UserName": searchTerm });
        console.log("Utente richiedente: ", myUsername);
        console.log("Utente da ricercare: ", searchTerm);

        if (!foundUser) {
            console.log("Utente non esistente");
            return res.status(404).json({ message: "Utente non esistente" });
        }

        const myUser = await Users.findOne({ "UserName": myUsername });

        if (!myUser) {
            return res.status(500).json({ message: "Errore nell'elaborazione della query" });
        }

        if (foundUser._id.toString() === myUser._id.toString()) {
            return res.status(500).json({ message: "Non puoi aggiungere te stesso come amico, coglione di merda fatti una vita" });
        }

        const friendCheck = await Friendships.findOne({ "_idUserFriend": foundUser._id, "_idUser": myUser._id });
        if (friendCheck) {
            return res.status(401).json({ message: "Hai già questo amico in rubrica" });
        }



        const addedFriend = await Friendships.create({
            _idUser: myUser._id,    //L'associazione che si fa è: CampoMongoDB: VariabileNodeJS
            _idUserFriend: foundUser._id,
        });

        if (!addedFriend) {
            return res.status(500).json({ message: "Errore nell'elaborazione della query" });
        }

        console.log("Amico aggiunto con successo");
        return res.json({ success: true, UserName: foundUser.UserName });
    } catch (err) {
        console.log("Errore nella richiesta dell'utente: ", err.message);
        return res.status(500).send("Errore nella ricerca dell'utente");
    }
}