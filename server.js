const express = require('express');
const mysql = require('mysql');
const myconn = require('express-myconnection');

const dotenv = require('dotenv');
const routes = require('./routes');

const app = express();
dotenv.config();

app.set('port', process.env.PORT || 9000);

dbOptions = {
    host: 'localhost',
    user: 'root',
    password: process.env.SEC_PASS,
    port: 3306,
    database: 'library'
};

// Middlewares --------------------------
app.use(myconn(mysql, dbOptions, 'single'));
app.use(express.json());

// Routes --------------------------------
app.get('/', (req, res) => {
    res.send('Welcome to my API')
});

app.use('/api', routes);


// Server Running--------------------------
app.listen(app.get('port'), () => {
    console.log('Servidor corriendo en port', app.get('port'));
});