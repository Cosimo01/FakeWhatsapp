const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    _idMittente: String,
    _idDestinatario: String,
    Descrizione: String
}, {
    versionKey: false,
});

module.exports = mongoose.model('message', messageSchema, 'Messages');