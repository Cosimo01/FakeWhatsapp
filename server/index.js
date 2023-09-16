// *** IMPORTAZIONE DEI MODULI ***
const express = require('express');
const app = express();

const server = require("http").createServer(app)
const { Server } = require('socket.io')

const { logger, logEvents } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
require('dotenv').config();

const cookieParser = require('cookie-parser');
const cors = require('cors');

const mongoose = require('mongoose');
const connectDB = require('./config/dbConnection');
const PORT = parseInt(process.env.SERVER_PORT, 10);

const { verifyJWT } = require('./middleware/verifyJWT');

// *** FINE ***


// *******************************

// *** CONNESSIONE AL DATABASE ***
connectDB();
// *** FINE ***


// *******************************


// *** IMPORTAZIONE DELLE ROUTES ***
const authRoute = require('./routes/authRoute');
const registerRoute = require('./routes/registerRoute')
const messagesRoute = require('./routes/messagesRoute');
const contactsRoute = require('./routes/contactsRoute');
const notFoundRoute = require('./routes/notFoundRoute');
const addFriendRoute = require('./routes/addFriendRoute');


// *** FINE ***


// *******************************



// *******************************

const corsOptions = {
  origin: process.env.ALLOWED_ORIGIN,
  methods: ['GET', 'POST'],
  credentials: true
}



// *** MIDDLWARE ***
app.use(logger)
app.use(cors(corsOptions));
app.use(require('express').json());
app.use(cookieParser())
// *** FINE ***

// *******************************


// *** ROUTES ***
app.use('/sign-in', authRoute);
app.use('/sign-up', registerRoute);

app.use(verifyJWT);
app.use("/addFriend", addFriendRoute)
app.use("/messages", messagesRoute);
app.use('/contacts', contactsRoute);
/* app.use('*', notFoundRoute); */
// *** FINE ***


// *******************************


app.use(errorHandler)

const io = new Server(server, {
  cors: corsOptions
})

io.on("connection", (socket) => {
  console.log('User connected: ', socket.id);

  socket.on('send_message', (data) => {
    console.log("\n\nID mittente: ", data.contactID);
    console.log(`Messaggio inviato: ${data.message}`);
    socket.emit('receive_message', data.message);
  })

  socket.on('disconnect', () => {
    console.log('User disconnected: ', socket.id)
  });
});

mongoose.connection.once('open', () => {
  console.log('\nConnessione a MongoDB stabilita.');

  server.listen(PORT, () => {
    console.log(`Il server è in esecuzione sulla porta: ${PORT}`, '\n')
  });

});
