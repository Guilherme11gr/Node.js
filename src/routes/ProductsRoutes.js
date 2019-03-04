'use-strict';

import express from 'express';
import ProductController from '../controllers/ProductsController';

class ProductRouter {
  static routes() {
    const router = express.Router();

    router.get('/', ProductController.get);

    router.get('/:slug', ProductController.getBySlug);

    router.get('/admin/:id', ProductController.getById);

    router.get('/tag/:tag', ProductController.getByTag);

    router.post('/', ProductController.post);

    router.put('/:id', ProductController.put);

    router.delete('/', ProductController.del);

    return router;
  }
}

export default ProductRouter;
