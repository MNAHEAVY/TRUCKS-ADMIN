const Products = require("../../models/products");

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const {
     code,
   name,
   description,
    brand,
    group,
    image
  } = req.body;

  try {
    const updatedProduct = await Products.findByIdAndUpdate(
      id,
      {  code,
   name,
   description,
    brand,
    group,
    image
      },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = updateProduct;
