const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const port  = 3000;
const customerRoutes = require('./routes/customer');
require('dotenv').config();

// db connection
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PSWD}@cluster0.n7zpm83.mongodb.net/ecom_db`)
    .then(() => {
        console.log('Connected to database');
    }).catch(() => {
        console.log('Connection failed!');
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    next();
});

app.get('/', (req, res) => {
    res.json({info: 'Node JS, Express JS and MongoDB Backend Rest API'});
});

app.use('/api/customer', customerRoutes);

app.listen(port, () => {
    console.log(`App running on port ${3000}`);
})
