const Contacts = require('../models/Friendships');
const Users = require('../models/Users');

module.exports.getContacts = async (req, res) => {
    try {
        const UserName = req.params.UserName;
        console.log("UserName: ", UserName)

        if(!UserName || UserName !== req.user.UserName) {
            const newError = new Error("Utente destinatario non esistente");
            newError.status = 404;
            throw newError;
        }

        const UserID = req.user._id;
        const foundFriendships = await Contacts.find({ _idUser: UserID }).lean();

        const friendIDs = foundFriendships.map(obj => obj._idUserFriend);
        const foundContacts = await Users.find({ _id: { $in: friendIDs } });

        res.json({friendships: foundContacts});
    } catch (error) {
        console.error('Errore durante la query al database: ', error.message);
        res.status(newError.status || 500).json({message: error.message });
    }
}