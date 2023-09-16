const mongoose = require('mongoose');
require('dotenv').config();
const debug = require('debug')('app:mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: 'dbFakeWhatsapp'
        });
    } catch (error) {
        console.error('Errore nella connessione al DB:', error);
    }
}

module.exports = connectDB;