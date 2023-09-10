const express = require('express')
const app = express();
require('dotenv').config();
const PORT = parseInt(process.env.SERVER_PORT, 10);


const homeRoute = require('./routes/homeRoute')
const notFoundRoute = require('./routes/notFoundRoute')

app.use((req, res, next) => {
    console.log(`Richiesta: ${req.method} ${req.url}`);
    next();
});

app.use('/', homeRoute);
app.use('*', notFoundRoute);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


