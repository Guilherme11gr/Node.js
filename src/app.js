'use-strict';

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import ProductRouter from './routes/ProductsRoutes';
import IndexRouter from './routes/IndexRouter';
import CustomerRouter from './routes/CustomerRoutes';
import OrderRouter from './routes/OrderRouter';
import config from './config';

// eslint-disable-next-line
mongoose.connect(config.connectionString, { useNewUrlParser: true }, err => (err ? console.error(err) : console.log(`\n\tConnected to \x1b[36m${config.connectionString}\x1b[0m`)));

const indexRouter = new IndexRouter();

const productRouter = new ProductRouter();

const customerRouter = new CustomerRouter();

const orderRouter = new OrderRouter();

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

// Habilita o CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use('/', indexRouter.routes());

app.use('/products', productRouter.routes());

app.use('/customers', customerRouter.routes());

app.use('/orders', orderRouter.routes());

export default app;
