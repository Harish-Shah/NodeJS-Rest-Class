let express = require('express');
let productRouter = require('./router/productRouter');
let product = require("./models/productModel");
const mongoose = require('mongoose');

let app = express(); //  this will create a server and gives us back reference of the server
app.use(express.json()); // this works as a middleware for rest api.It parses incoming requests with JSON payloads and is based on body-parser.
app.use(productRouter);

function connectMongo () {
    let url = "mongodb+srv://harisshah9867:haris9867@cluster0.hsoo1ky.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    mongoose.connect(url)
    .then(() => {
        console.log("Mongoose DB Connected")
    }).catch(error => {
        console.log(error)
    })
}

app.listen(9000, () => {
  console.log('Server Started at http://localhost:9000');
  connectMongo();
});
