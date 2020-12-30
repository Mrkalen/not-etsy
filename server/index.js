require('dotenv/config');
const pg = require('pg');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
const ClientError = require('./client-error');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL
});

const app = express();

app.use(staticMiddleware);

app.get('/api/products', (req, res, next) => {
  const sql = `
  select *
    from products
  order by "productId" desc;
    `;
  db.query(sql)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/products/:productId', (req, res, next) => {
  const productId = parseInt(req.params.productId, 10);
  if (!productId) {
    throw new ClientError(400, 'productId must be a positive Integer');
  }
  const sql = `
    select "productId",
           "productName",
           "description",
           "price",
           "pictureUrl",
           "categoryId",
           "customizationId"
      from "products"
     where "productId" = $1
     `;
  const params = [productId];
  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) {
        throw new ClientError(404, `cannot find product with productId ${productId}`);
      }
      res.json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
