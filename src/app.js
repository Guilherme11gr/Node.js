'use-strict';

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import ProductRouter from './routes/ProductsRoutes';
import IndexRouter from './routes/IndexRouter';

const indexRouter = new IndexRouter();
const productRouter = new ProductRouter();

const uri = 'mongodb://guilherme11gr:guilherme11gr@ds030817.mlab.com:30817/node-store';

mongoose.connect(uri, { useNewUrlParser: true }, err => (err ? console.error(err) : console.log(`\n\tConnected to \x1b[36m${uri}\x1b[0m`)));

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRouter.routes());

app.use('/products', productRouter.routes());

export default app;
