'use-strict';

import md5 from 'md5';
import config from '../../config';
import CustomerRepository from '../../repositories/CustomerRepository';
import CustomerValidator from './CustomerValidator';
import EmailServices from '../../services/EmailServices';
import AuthServices from '../../services/AuthServices';


class CustomerController {
  constructor() {
    this.repository = new CustomerRepository();
  }

  get = async (req, res) => {
    try {
      const customers = await this.repository.get();

      res.status(200).send(customers);
    } catch (error) {
      res.status(400).send({ message: 'Failed to list customer', data: error });
    }
  };

  post = async ({ body }, res) => {
    const contract = new CustomerValidator();

    const emailService = new EmailServices();

    const { name, email, password } = body;

    const passwordHash = md5(password + config.SALT_KEY);

    const customer = { name, email, password: passwordHash, roles: ['user'] };

    if (!contract.isCustumerValid(customer)) {
      res.status(400).send({ message: 'Failed to register Customer', data: contract.getErrors() });
      return;
    }

    try {
      const response = await this.repository.create(customer);

      res.status(201).send({ message: 'Customer successfully registered', data: response });

      emailService.sendWelcome(customer);
    } catch (error) {
      res.status(400).send({ message: 'Failed to register Customer', data: error });
    }
  };

  authenticate = async ({ body }, res) => {
    try {
      const authServices = new AuthServices();

      const { email: emailToFind, password } = body;

      const passwordHash = md5(password + config.SALT_KEY);

      const customerToFind = { email: emailToFind, password: passwordHash };

      const { name, email, _id: id, roles } = await this.repository.authenticate(customerToFind);

      const token = await authServices.generateToken({ name, email, id, roles });

      res.status(200).send({ token, data: { name, email } });
    } catch (error) {
      res.status(400).send({ message: 'Failed to authenticate Customer', data: error });
    }
  };

  refreshToken = async ({ body, query, headers }, res) => {
    try {
      const authServices = new AuthServices();

      const token = body.token || query.token || headers['x-access-token'];

      const decodedToken = await authServices.decodeToken(token);

      const { id: oldId } = decodedToken;

      const { name, email, _id: id, roles } = await this.repository.getById(oldId);

      const refreshedToken = await authServices.generateToken({ name, email, id, roles });

      res.status(200).send({ refreshedToken, data: { name, email } });
    } catch (error) {
      res.status(400).send({ message: 'Failed to refresh token', data: error });
    }
  };
}

export default CustomerController;
