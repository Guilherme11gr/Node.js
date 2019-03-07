'use-strict';

import ProductValidator from './ProductsValidator';
import ProductRepository from '../../repositories/ProductRepository';

class ProductController {
  constructor() {
    this.repository = new ProductRepository();
  }

  get = async (req, res) => {
    try {
      const products = await this.repository.get();

      res.status(200).send(products);
    } catch (error) {
      res.status(400).send({ message: 'Failed to list products', data: error.message });
    }
  };

  getBySlug = async ({ params }, res) => {
    try {
      const { slug } = params;

      const products = await this.repository.getBySlug(slug);

      res.status(200).send(products);
    } catch (error) {
      res.status(400).send({ message: 'Failed to list products', data: error });
    }
  };

  getById = async ({ params }, res) => {
    try {
      const { id } = params;

      const products = await this.repository.getById(id);

      res.status(200).send(products);
    } catch (error) {
      res.status(400).send({ message: 'Failed to list products', data: error });
    }
  };

  getByTag = async ({ params }, res) => {
    try {
      const { tag } = params;

      const products = await this.repository.getByTag(tag);

      res.status(200).send(products);
    } catch ({ message }) {
      res.status(400).send({ message });
    }
  };

  post = async ({ body }, res) => {
    const contract = new ProductValidator();

    try {
      if (contract.isProductValid(body)) {
        const response = await this.repository.create(body);

        res.status(201).send({ message: 'Product successfully registered', data: response });
      } else {
        res.status(400).send({ message: 'Failed to register Product', data: contract.getErrors() });
      }
    } catch (error) {
      res.status(400).send({ message: 'Failed to register Product', data: error });
    }
  };

  put = async ({ params, body }, res) => {
    const { id } = params;

    try {
      const product = await this.repository.update(id, body);

      res.status(200).send({ data: product, message: 'Product successfully updated' });
    } catch (error) {
      res.status(400).send({ message: 'Failed to update product', data: error });
    }
  };

  delete = async ({ body }, res) => {
    const { id } = body;
    try {
      const product = await this.repository.remove(id);

      res.status(200).send({ data: product, message: 'Product successfully removed' });
    } catch (error) {
      res.status(400).send({ message: 'Failed to remove product', data: error });
    }
  };
}

export default ProductController;
