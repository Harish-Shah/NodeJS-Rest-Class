let express = require("express");

let router = express.Router();

let {getProducts,saveProduct, deleteProduct, updateProduct} = require("../controller/productController")

router.get("/",getProducts)

router.post('/products',saveProduct)

router.delete("/products/:id",deleteProduct)

router.put("/products",updateProduct)

module.exports = router;