const Products = require("../../models/products");

const createProduct = async (req, res) => {
  const {
   code,
   name,
   description,
    brand,
    group,
    image
  } = req.body;

  try {
    const newProduct = new Products({
       code,
   name,
   description,
    brand,
    group,
    image
    });
    const savedProduct = await newProduct.save();
    return res.status(201).json(savedProduct);
  } catch (error) {
    console.error(error); // Imprime el error para ayudar a diagnosticar el problema.
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = createProduct;
