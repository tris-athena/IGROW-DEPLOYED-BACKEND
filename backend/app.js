const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const cors = require('cors')
// const services = require('./routes/service');


app.use(cors({
    origin: ['http://localhost:3000','https://myrmidons.onrender.com']
}))
app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({limit: "50mb", extended: true }));
app.use(cookieParser());
// app.use(express.json());
// app.use('/api/v1', services);





module.exports = app