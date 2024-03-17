const { connect } = require('mongoose');
let product = require('../models/productModel'); // product is the model created in productModel.js file

// let products = [
//   {
//     id: 1,
//     name: 'T-Shirts',
//     brand: 'Polo',
//     price: '700',
//     quantity: '20',
//   },
//   {
//     id: 2,
//     name: 'Shoes',
//     brand: 'Nike',
//     price: '2500',
//     quantity: '5',
//   },
//   {
//     id: 3,
//     name: 'Jeans',
//     brand: "Levi's",
//     price: '3500',
//     quantity: '10',
//   },
// ];

let getProducts = async (req, resp) => {
    // resp.status(200).send(products);
    let page = req.query.page;
    let limit = req.query.limit;

    if (page == undefined || page == null) {
        page = 1; // setting default page
    }
    if (limit === undefined || limit == null) {
        limit = 3; //setting default limit
    }

    let skip = (page - 1) * limit
    try {
        let products = await product.find({}).limit(limit).skip(skip);
        resp.status(200).send(products);
    } catch (error) {
        console.log(error);
        resp.status(500).send('Something went wrong');
    }
};

let saveProduct = async (req, resp) => {
    //   let product = req.body;
    //   products.push(product);
    //   resp.status(201).send(products);
    let newProduct = req.body;

    try {
        await product.create(newProduct);
        resp.status(201).send(await product.find({}));
    } catch (error) {
        console.log(error);
        resp.status(500).send('Something went wrong');
    }
};

let deleteProduct = async (req, resp) => {
    //   let newProducts = products.filter((product) => {
    //     return product.id != req.params.id;
    //   });
    //   resp.status(200).send(newProducts);
    let prodToDelete = await product.findOne({ id: req.params.id });
    if (prodToDelete) {
        try {
            await product.deleteOne({ id: req.params.id }); // prodToDelete.id will work too
            resp.status(200).send(await product.find({}));
        } catch (error) {
            console.log(error);
            resp.status(500).send('Something went wrong');
        }
    } else {
        resp.status(404).send('Product not found!');
    }
};

let updateProduct = async (req, resp) => {
    //   updatedProduct = req.body;
    //   products.map((product) => {
    //     if (product.id == updatedProduct.id) {
    //       product.name = updatedProduct.name;
    //       product.brand = updatedProduct.brand;
    //       product.price = updatedProduct.price;
    //       product.quantity = updatedProduct.quantity;
    //     }
    //     return product;
    //   });
    //   resp.status(200).send(products);

    let prodToUpdate = await product.findOne({ id: req.params.id });
    if (prodToUpdate) {
        try {
            await product.updateOne({ id: req.params.id }, { $set: req.body });
            resp.status(200).send(await product.find({ id: req.params.id })); //only showing the updated product in response
        } catch (error) {
            console.log(error);
            resp.status(500).send('Something went wrong');
        }
    } else {
        resp.status(404).send('Product not Found!');
    }
};

module.exports = { getProducts, saveProduct, deleteProduct, updateProduct };
