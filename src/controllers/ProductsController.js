/* eslint-disable */
'use-strict';

import mongoose from 'mongoose';
import '../models/products';

const Product = mongoose.model('Product');

class ProductController {
  async get(req, res) {
    try {
      const products = await Product.find({ active: true }, 'title slug description price');
      res.status(200).send(products);
    } catch (error) {
      res.status(400).send({ message: 'Falha ao listar produtos !', data: error.message });
    }
  }

  async getBySlug(req, res) {
    try {
      const { slug } = req.params;

      const products = await Product.findOne({ slug, active: true }, 'title slug description price');

      res.status(200).send(products);
    } catch (error) {
      res.status(400).send({ message: 'Falha ao listar produtos !', data: error });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;

      const products = await Product.findById({ id, active: true }, 'title slug description price');

      res.status(200).send(products);
    } catch (error) {
      res.status(400).send({ message: 'Falha ao listar produtos !', data: error });
    }
  }

  async getByTag(req, res) {
    try {
      const { tag } = req.params;

      const products = await Product.find({ tag, active: true }, 'title slug description price tags');

      if (products.length === 0) {
        throw new Error(`Nenhum produto encontrado com a tag '${tag}' !`);
      }

      res.status(200).send(products);
    } catch ({ message }) {
      res.status(400).send({ message });
    }
  }

  async post({ body }, res) {
    const product = new Product(body);

    try {
      const response = await product.save();

      res.status(201).send({ message: 'Produto cadastrado com sucesso !', data: response });
    } catch (error) {
      res.status(400).send({ message: 'Falha ao cadastrar produto !', data: error });
    }
  }

  async put({ params, body }, res) {
    const { id } = params;
    const { title, description, price } = body;

    try {
      const product = await Product.findByIdAndUpdate(id, { title, description, price });

      res.status(200).send({ data: product, message: 'Produto atualizado com sucesso !' });
    } catch (error) {
      res.status(400).send({ message: 'Falha ao atualizar produto !', data: error });
    }
  }

  async del({ params }, res) { // TODO: fazer o delete pelo body;
    const { id } = params;
    try {
      const product = await Product.findByIdAndUpdate(id);
      res.status(200).send({ data: product, message: 'Produto removido com sucesso !' });
    } catch (error) {
      res.status(400).send({ message: 'Falha ao remover produto !', data: error });
    }
  }
}

export default ProductController;
