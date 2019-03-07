'use-strict';

import express from 'express';
import ProductController from '../controllers/products/ProductsController';
import AuthServices from '../services/AuthServices';

class ProductRouter {
  constructor() {
    this.router = express.Router();
    this.productController = new ProductController();
    this.authService = new AuthServices();
  }

  routes = () => {
    this.router.get('/', this.productController.get);

    this.router.get('/:slug', this.productController.getBySlug);

    this.router.get('/tag/:tag', this.productController.getByTag);

    this.router.get('/admin/:id', this.authService.isAdmin, this.productController.getById);

    this.router.post('/', this.authService.isAdmin, this.productController.post);

    this.router.put('/:id', this.authService.isAdmin, this.productController.put);

    this.router.delete('/', this.authService.isAdmin, this.productController.delete);

    return this.router;
  };
}

export default ProductRouter;
