const mongoose = require('mongoose');

const friendshipsSchema = mongoose.Schema({
    _idUser: String,
    _idUserFriend: String,
}, {
    versionKey: false
});

module.exports = mongoose.model("friendship", friendshipsSchema);