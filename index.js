let express = require('express');
let productRouter = require('./router/productRouter');

let app = express(); //  this will create a server and gives us back reference of the server
app.use(express.json()); // this works as a middleware for rest api.It parses incoming requests with JSON payloads and is based on body-parser.
app.use(productRouter);

app.listen(9000, () => {
  console.log('Server Started at http://localhost:9000');
});
