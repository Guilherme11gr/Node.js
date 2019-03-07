'use-strict';

import express from 'express';
import OrderController from '../controllers/order/OrderController';
import AuthServices from '../services/AuthServices';

class OrderRouter {
  constructor() {
    this.router = express.Router();
    this.orderController = new OrderController();
    this.authServices = new AuthServices();
  }

  routes = () => {
    this.router.get('/', this.authServices.authorize, this.orderController.get);

    this.router.post('/', this.authServices.authorize, this.orderController.post);

    return this.router;
  };
}

export default OrderRouter;
