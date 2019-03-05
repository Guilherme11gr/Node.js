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

  create = async product => this.product.save(product);

  update = async (id, produtc) => this.product.findByIdAndUpdate(id, produtc, { new: true });

  remove = async id => this.product.findOneAndDelete(id);
}

export default ProductRepository;
