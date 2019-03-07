'use-strict';

import express from 'express';
import CustomerController from '../controllers/customer/CustomerController';
import AuthServices from '../services/AuthServices';


class CustomerRouter {
  constructor() {
    this.router = express.Router();
    this.customerController = new CustomerController();
    this.authServices = new AuthServices();
  }

  routes = () => {
    this.router.get('/', this.customerController.get);

    this.router.post('/', this.customerController.post);

    this.router.post('/authenticate', this.customerController.authenticate);

    this.router.post('/refresh-token', this.authServices.authorize, this.customerController.refreshToken);

    return this.router;
  };
}

export default CustomerRouter;
