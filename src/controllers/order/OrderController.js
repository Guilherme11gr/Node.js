'use-strict';

import uiid from 'uuid/v1';
import OrderRepository from '../../repositories/OrderRepository';
import OrderValidator from './OrderValidator';
import AuthServices from '../../services/AuthServices';

class OrderController {
  constructor() {
    this.repository = new OrderRepository();
  }

  get = async (req, res) => {
    try {
      const order = await this.repository.get();

      res.status(200).send(order);
    } catch (error) {
      res.status(400).send({ message: 'Failed to list orders', data: error.message });
    }
  };

  post = async ({ body, query, headers }, res) => {
    const contract = new OrderValidator();

    const authServices = new AuthServices();

    const { items } = body;

    const token = body.token || query.token || headers['x-access-token'];

    const decodedToken = await authServices.decodeToken(token);

    const { id } = decodedToken;

    const order = { customer: id, items, number: uiid() };

    if (!contract.isOrderValid(order)) {
      res.status(400).send({ message: 'Failed to register Customer', data: contract.getErrors() });
      return;
    }

    try {
      const response = await this.repository.create(order);

      res.status(201).send({ message: 'Customer successfully registered', data: response });
    } catch (error) {
      res.status(400).send({ message: 'Failed to register Customer', data: error });
    }
  };
}

export default OrderController;
