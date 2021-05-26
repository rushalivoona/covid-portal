const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const url='mongodb://127.0.0.1:27017/VaccineRegistration';
mongoose.connect(url,{useNewUrlParser:true, useUnifiedTopology:true});

app.use(bodyParser.json());
app.use(cors());

app.listen(3003,() => {
    console.log('Listening at port 3003');
})