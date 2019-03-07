'use-strict';

import mongoose from 'mongoose';
import '../models/customer';

class CustomerRepository {
  constructor() {
    this.customer = mongoose.model('Customer');
  }

  get = async () => this.customer.find();

  getById = async _id => this.customer.findOne({ _id });

  create = async (customer) => { // eslint-disable-next-line
    const newCustomer = new this.customer(customer);

    return newCustomer.save(newCustomer);
  };

  authenticate = async ({ email, password }) => this.customer.findOne({ email, password });
}

export default CustomerRepository;
