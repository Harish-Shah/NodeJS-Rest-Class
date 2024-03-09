let express = require("express");
let productRouter = require("./router/productRouter")

let app = express(); //  this will create a server and gives us back refrence of the server
app.use(express.json());
app.use(productRouter);

app.listen(9000,() => {
    console.log("Server Started at http://localhost:9000");
})