const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const port  = 5000;
const customerRoutes = require('./routes/customer');
const productRoutes = require('./routes/product');
const purchaseRoutes = require('./routes/purchase');
const userRoutes = require('./routes/user');
require('dotenv').config();

// db connection
const env = process.env;
mongoose.connect(`mongodb+srv://${env.DB_USER}:${env.DB_PSWD}@${env.DB_CLUSTER}/${env.DB_NAME}`)
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
app.use('/api/product', productRoutes);
app.use('/api/purchase', purchaseRoutes);
app.use('/api/user', userRoutes);

app.listen(port, () => {
    console.log(`App running on port ${port}`);
})
