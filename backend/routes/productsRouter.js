const express = require('express');
const productsRouter = express.Router();
const multer = require('multer');
const sharp = require('sharp');

const Product = require('../database/productsModel');
const authenticate = require('../middleware/authenticate');
const admin = require('../middleware/admin');
const cloudinary = require('../utilities/cloudinary');

const upload =  multer({
  limits: {
    fileSize: 1000000
  },

  fileFilter(req, file, cb) {

    if(!file.originalname.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/)) {

      return cb(new Error('Please, upload only jpg, jpeg, or png file'));
    }

    cb(undefined, true);
  }
});

productsRouter.patch('/admin/products/:id/image', authenticate, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      const error = new Error('Product not found.');
      return res.status(404).json({ error: error.message });
    }

    return res.status(200).json(product);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

productsRouter.post('/admin/products/create', authenticate, admin, async (req, res) => {
  try {
    const newProduct = {
      ...req.body,
      user: req.user._id
    }

    const product = new Product(newProduct);
    product.save();

    return res.status(200).json(product);

  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

productsRouter.get('/products/all', async (req, res) => {
  try {
    const allProducts = await Product.find({});
    const totalProducts = await Product.countDocuments();
    return res.status(200).json({ totalProducts, products: allProducts });
  } catch (error) {

    return res.status(400).json({ error: error.message });
  }

});

productsRouter.get('/admin/products', authenticate, admin, async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).json(products);

  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

productsRouter.get('/admin/products/:id', authenticate, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      const error = new Error('Product not found');
      return res.status(404).json({ error: error.message });
    }
    return res.status(200).json(product);

  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

productsRouter.get('/products/:id', async (req, res) => {
  try {
    const _id = req.params.id;
    const product = await Product.findById(_id);

    if (!product) {
      const error = new Error('Product not found!');
      return res.status(404).json({ error: error.message });
    }

    return res.status(200).json(product);

  } catch (error) {
    return res.status(400).json({ error: error.message });
  }

});

productsRouter.patch('/admin/products/:id/edit', authenticate, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      const error = new Error('Product not found');
      return res.status(404).json({ errror: error.message });
    }


    const editedProduct = {
      ...req.body
    }

    await Product.findByIdAndUpdate(req.params.id, editedProduct, { new: true,useFindAndModify: false });

    return res.status(200).json();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

productsRouter.delete('/admin/products/:id/delete', authenticate, admin, async (req, res) => {
  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      const error = new Error('Product not found!');
      return res.status(404).json({ error: error.message });
    }
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    return res.status(200).json(deletedProduct);

  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
});

module.exports = productsRouter;
