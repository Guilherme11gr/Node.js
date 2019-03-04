'use-strict';

import express from 'express';

class IndexRouter {
  routes() {
    this.router = express.Router();

    const IndexGet = this.router.get('/', (req, res) => {
      res.status(200).send({ title: 'Node Store API', version: '0.0.1' });
    });

    return IndexGet;
  }
}

export default IndexRouter;
