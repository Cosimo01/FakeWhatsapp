const Message = require('../models/Messages');
const User = require('../models/Users')

module.exports.getMessages = async (req, res) => {
    try {
        const UserName = req.params.UserName;
        const contactID = req.body.contactID;
        console.log("UserName: ", UserName)

        if (!UserName || UserName !== req.user.UserName) {
            const newError = new Error("Utente non esistente");
            newError.status = 404;
            throw newError;
        }

        if (!contactID) {
            const newError = new Error("Impossibile accedere alla conversazione, identidicativo del contatto mancante");
            newError.status = 404;
            throw newError;
        }

        console.log("contactID: ", contactID)
        const userID = req.user._id;

        console.log(`idUser: ${userID} | idContact: ${contactID}`)

        const foundMessages = await Message.find({
            $or: [
                { _idMittente: userID, _idDestinatario: contactID },
                { _idMittente: contactID, _idDestinatario: userID }
            ]
        }).lean();

        return res.json({ UserName: req.user.UserName, Messages: foundMessages });
    } catch (error) {
        console.error('Errore durante la query al database: ', error.message);
        return res.status(error.status || 500).json({ message: error.message });
    }
}

module.exports.sendMessage = async (req, res) => {
    try {
        const UserName = req.params.UserName;
        const { message, contactID } = req.body;
        console.log("Messaggio: ", message, " da inviare a: ", contactID);

        if (!UserName || UserName !== req.user.UserName) {
            const newError = new Error("Utente non esistente");
            newError.status = 404;
            throw newError;
        }

        if (!contactID) {
            const newError = new Error("Impossibile accedere alla conversazione, identidicativo del contatto mancante");
            newError.status = 404;
            throw newError;
        }

        const foundSender = await User.findOne({ UserName: UserName });


        if (message === "") return res.status(404).json({ message: "Messaggio non identificato" });

        const isSended = await Message.create({
            _idMittente: foundSender._id,
            _idDestinatario: contactID,
            Descrizione: message
        });

        if (!isSended) return res.status(500).json({ message: "C'è stato un problema durante l'elaborazione della query" });

        return res.status(200).json({ success: true, message: "Sended" });

    } catch (error) {
        console.error(`Errore durante l'invio del messaggio: ${error.message}`);
        return res.status(error.status || 500).json({ message: error.message });
    }
}