const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const cors = require('cors')
 const user = require('./routes/user');


 app.use(cors({
    origin: 'http://localhost:3000', // Frontend URL
  }));
  
app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({limit: "50mb", extended: true }));
app.use(cookieParser());
// app.use(express.json());
app.use('/api/v1', user);


//this is a test if git is working -junio


module.exports = app