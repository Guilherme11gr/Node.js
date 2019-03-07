'use-strict';

import mongoose from 'mongoose';
import '../models/products';

class ProductRepository {
  constructor() {
    this.product = mongoose.model('Product');
  }

  get = async () => this.product.find({ active: true }, 'title slug description price');

  getBySlug = async slug => this.product.findOne({ slug, active: true }, 'title slug description price');

  getById = async id => this.product.findById({ id, active: true }, 'title slug description price');

  getByTag = async tags => this.product.find({ tags, active: true }, 'title slug description price tags');

  create = async (product) => { // eslint-disable-next-line
    const newProduct = new this.product(product);
    return newProduct.save(newProduct);
  };

  update = async (_id, produtc) => this.product.findOneAndUpdate({ _id }, produtc, { new: true });

  remove = async _id => this.product.findOneAndDelete({ _id });
}

export default ProductRepository;
