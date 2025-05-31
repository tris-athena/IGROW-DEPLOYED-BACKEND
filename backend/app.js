const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const cors = require('cors')
 const user = require('./routes/user');
 const post = require('./routes/post');
 const watercollection = require("./routes/watercollection");
 const watersupply = require("./routes/watersupply");
 const waterfiltration = require("./routes/waterfiltration");
 const fishfeeding = require("./routes/fishfeeding");
 const solarpanel = require("./routes/solarpanel");
 const watertankquality = require("./routes/watertankquality");
 const aquariumquality = require("./routes/aquariumquality");
 const waterdrain = require("./routes/waterdrain");
 const environment = require("./routes/environment");
 const watercycle = require("./routes/watercycle");
 const hydroponics = require("./routes/hydroponics");


 app.use(cors({
    origin: 'http://localhost:3000', // Frontend URL
  }));
  
app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({limit: "50mb", extended: true }));
app.use(cookieParser());
// app.use(express.json());
app.use('/api/v1', user);
app.use('/api/v1', post);
app.use('/api/v1', watercollection);
app.use('/api/v1', watersupply);
app.use('/api/v1', waterfiltration);
app.use('/api/v1', fishfeeding);
app.use('/api/v1', solarpanel);
app.use('/api/v1', watertankquality);
app.use('/api/v1', aquariumquality);
app.use('/api/v1', waterdrain);
app.use('/api/v1', environment);
app.use('/api/v1', watercycle);
app.use('/api/v1', hydroponics);


//this is a test if git is working -junio


module.exports = app