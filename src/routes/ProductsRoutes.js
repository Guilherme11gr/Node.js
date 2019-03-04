'use-strict';

import express from 'express';
import ProductController from '../controllers/ProductsController';

class ProductRouter {
  constructor() {
    this.router = express.Router();
    this.productController = new ProductController();
  }

  routes() {
    this.router.get('/', this.productController.get);

    this.router.get('/:slug', this.productController.getBySlug);

    this.router.get('/admin/:id', this.productController.getById);

    this.router.get('/tag/:tag', this.productController.getByTag);

    this.router.post('/', this.productController.post);

    this.router.put('/:id', this.productController.put);

    this.router.delete('/', this.productController.del);

    return this.router;
  }
}

export default ProductRouter;
