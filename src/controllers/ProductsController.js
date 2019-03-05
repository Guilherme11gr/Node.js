'use-strict';

import ProductValidator from './ProductsValidator';
import ProductRepository from '../repositories/ProductRepository';

class ProductController {
  constructor() {
    this.repository = new ProductRepository();
  }

  get = async (req, res) => {
    try {
      const products = await this.repository.get();

      res.status(200).send(products);
    } catch (error) {
      res.status(400).send({ message: 'Falha ao listar produtos !', data: error.message });
    }
  };

  getBySlug = async ({ params }, res) => {
    try {
      const { slug } = params;

      const products = await this.repository.getBySlug(slug);

      res.status(200).send(products);
    } catch (error) {
      res.status(400).send({ message: 'Falha ao listar produtos !', data: error });
    }
  };

  getById = async ({ params }, res) => {
    try {
      const { id } = params;

      const products = await this.repository.getById(id);

      res.status(200).send(products);
    } catch (error) {
      res.status(400).send({ message: 'Falha ao listar produtos !', data: error });
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
        const response = this.repository.create(body);

        res.status(201).send({ message: 'Produto cadastrado com sucesso !', data: response });
      } else {
        res.status(400).send({ message: 'Falha ao cadastrar produto !', data: contract.getErrors() });
      }
    } catch (error) {
      res.status(400).send({ message: 'Falha ao cadastrar produto !', data: error });
    }
  };

  put = async ({ params, body }, res) => {
    const { id } = params;

    try {
      const product = await this.repository.update(id, body);

      res.status(200).send({ data: product, message: 'Produto atualizado com sucesso !' });
    } catch (error) {
      res.status(400).send({ message: 'Falha ao atualizar produto !', data: error });
    }
  };

  delete = async ({ params }, res) => {
    const { id } = params;

    try {
      const product = await this.repository.remove(id);

      res.status(200).send({ data: product, message: 'Produto removido com sucesso !' });
    } catch (error) {
      res.status(400).send({ message: 'Falha ao remover produto !', data: error });
    }
  };
}

export default ProductController;
