const express = require('express');
const productsRouter = express.Router();

const fileType = require('file-type');
const multiparty = require('multiparty');
const fs = require('fs');
const Product = require('../database/productsModel');
const authenticate = require('../middleware/authenticate');
const admin = require('../middleware/admin');
const uploadFile = require('../utilities/s3Upload');

productsRouter.post('/products/:id/review', authenticate, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    const reviews = [...product.reviews];
    const existingUserReview = reviews.filter((review) => {
      return req.user._id.toString() === review.user.toString();
    });

    if (existingUserReview.length > 0) {
      const error = new Error('You have already reviewed this product.');
      return res.status(400).json({ error: error.message });
    } else {
      const { rating, comment } = req.body;

      const newReview = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
      };

      product.reviews = product.reviews.concat(newReview);
      await product.save();

      const existingProduct = await Product.findById(req.params.id);
      existingProduct.numberOfReviews = existingProduct.reviews.length;

      let sum = 0;

      existingProduct.reviews.forEach((review) => {
        sum = (sum + Number(review.rating));
      });

      if (sum === 0) {
        existingProduct.averageRating = rating;
        await existingProduct.save();
      } else {
        const averageRating = (sum / Number(existingProduct.reviews.length));
        existingProduct.averageRating = averageRating;
        await existingProduct.save();
      }
      return res.status(201).json({ message: 'Your review has been successfully added. Thank you.'});
    }

  } catch (error) {
    return res.status(500).json({ error: error.message });
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

productsRouter.get('/products/rated', async (req, res) => {
  try {
    const products = await Product.$where('this.averageRating === 5').limit(8).exec();

    const highestRated = products.filter((product) => {
      return product.averageRating === 5;
    });

    const ratedProduct = highestRated.map((product) => {
      product.numberOfReviews = undefined;
      product.stock = undefined;
      product.reviews = undefined;
      product.brand = undefined;
      product.description = undefined;
      product.user = undefined;
      product.createdAt = undefined;
      product.updatedAt = undefined;
      product.__v = undefined;
      product.category = undefined;
      return product;
    });

    return res.status(200).json(ratedProduct);

  } catch (error) {

    return res.status(500).json({ error: error.message });
  }
});

productsRouter.get('/products/all', async (req, res) => {
  try {
    const keyword = req.query.keyword ? {
      name: {
        $regex: req.query.keyword,
        $options: 'i'
      }
    }: {};

    const allProducts = await Product.find({ ...keyword });
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
