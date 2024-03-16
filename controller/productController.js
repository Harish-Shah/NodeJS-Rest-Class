let products = [
  {
    id: 1,
    name: 'T-Shirts',
    brand: 'Polo',
    price: '700',
    quantity: '20',
  },
  {
    id: 2,
    name: 'Shoes',
    brand: 'Nike',
    price: '2500',
    quantity: '5',
  },
  {
    id: 3,
    name: 'Jeans',
    brand: "Levi's",
    price: '3500',
    quantity: '10',
  },
];

let getProducts = (req, resp) => {
  resp.send('Home Page');
};

let saveProduct = (req, resp) => {
  let product = req.body;
  products.push(product);
  resp.status(201).send(products);
};

let deleteProduct = (req, resp) => {
  let newProducts = products.filter((product) => {
    return product.id != req.params.id;
  });

  resp.status(200).send(newProducts);
};

let updateProduct = (req, resp) => {
  updatedProduct = req.body;

  products.map((product) => {
    if (product.id == updatedProduct.id) {
      product.name = updatedProduct.name;
      product.brand = updatedProduct.brand;
      product.price = updatedProduct.price;
      product.quantity = updatedProduct.quantity;
    }
    return product;
  });

  resp.status(200).send(products);
};

module.exports = { getProducts, saveProduct, deleteProduct, updateProduct };
