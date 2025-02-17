import Product from "../models/product.js";
import { isAdmin } from "./userController.js";

export function createProduct(req, res) {
  if (!isAdmin(req)) {
    res.json({
      message: "Please login as administrator to add products",
    });
    return;
  }

  const newProductData = req.body;

  const product = new Product(newProductData);

  product
    .save()
    .then(() => {
      res.json({
        message: "Product created",
      });
    })
    .catch((error) => {
      res.status(403).json({
        message: error,
      });
    });
}

export function getProduct(req, res) {
  Product.find({}).then((products) => {
    res.json(products);
  });
}

export function deleteProduct(req, res) {
  if (!isAdmin(req)) {
    res.status(403).json({
      message: "Please login as administrator to delete products",
    });
    return;
  }

  const productId = req.params.ProductId;

  Product.deleteOne({ ProductId: productId })
    .then(() => {
      res.json({
        message: "Product deleted",
      });
    })
    .catch((error) => {
      res.status(500).json({
        message:
          error.message || "An error occurred while deleting the product",
      });
    });
}

export function updateProduct(req, res) {
  if (!isAdmin(req)) {
    res.status(403).json({
      message: "Please login as administrator to delete products",
    });
    return;
  }
  const productId = req.params.ProductId;
  const data = req.body;
  // update request ekedi param(productId) eka witharak thibunta madi body ekath oni( const data = req.body;)eka nathi nisai oyage update eka fail une
  Product.updateOne({ ProductId: productId }, { $set: data })
    .then(() => {
      res.json({
        message: "Product updated",
      });
    })
    .catch((error) => {
      res.status(500).json({
        message:
          error.message || "An error occurred while updating the product",
      });
    });
}

export async function getProductById(req, res) {
  try {
    const productId = req.params.ProductId;

    const product = await Product.findOne({ ProductId: productId });

    res.json(product);
  } catch (e) {
    res.status(500).json({
      e,
    });
  }
}

export async function searchProducts(req, res) {
  const query = req.params.query;
  try {
    const products = await Product.find({
      $or: [
        { productName: { $regex: query, $options: "i" } },
        { altNames: { $elemMatch: { $regex: query, $options: "i" } } },
      ],
    });

    res.json(products);
  } catch (e) {
    res.status(500).json({
      e,
    });
  }
}
