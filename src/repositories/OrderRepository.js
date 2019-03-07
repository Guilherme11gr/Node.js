'use-strict';

import mongoose from 'mongoose';
import '../models/order';

class OrderRepository {
  constructor() {
    this.order = mongoose.model('Order');
  }

  get = async () => this.order.find({}, 'number status price items customer')
    .populate('customer', 'name')
    .populate('items.product', 'title');

  create = async (order) => {
    // eslint-disable-next-line
    const newOrder = new this.order(order);
    return newOrder.save(newOrder);
  };

  // eslint-disable-next-line
  update = async (_id, order) => this.order.findOneAndUpdate({ _id }, order, { new: true });

  remove = async _id => this.order.findOneAndDelete({ _id });
}

export default OrderRepository;
