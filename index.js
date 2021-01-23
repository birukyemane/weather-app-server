const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const observationRouter = require('./routes/observationRouter');

const url = 'mongodb+srv://test-user:test-user-123@cluster0.xceuv.mongodb.net/weather-app?retryWrites=true&w=majority';
const connect = mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
const hostname = 'localhost';
const port = 3001;

const app = express();
app.use(cors());
app.use('/observations', observationRouter);

const server = http.createServer(app);

server.listen(port, hostname, ()=>{
    console.log(`Server running at http://${hostname}:${port}`);
});

connect.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { console.log(err); });