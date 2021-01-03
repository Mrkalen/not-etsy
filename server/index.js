require('dotenv/config');
const pg = require('pg');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
const ClientError = require('./client-error');
const jwt = require('jsonwebtoken');
const equal = require('./lib/equal');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL
});

const app = express();

const jsonMiddleware = express.json();

app.use(jsonMiddleware);

app.use(staticMiddleware);

app.get('/api/products', (req, res, next) => {
  const sql = `
  select *
    from "products"
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
  if (!Number.isInteger(productId)) {
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

app.post('/api/cartItems', (req, res, next) => {
  const { productId, customizations, quantity } = req.body;
  const qtyNum = parseInt(quantity, 10);
  const prodNum = parseInt(productId, 10);
  if (!productId) {
    throw new ClientError(400, 'productId are required.');
  } else if (!Number.isInteger(qtyNum) || !Number.isInteger(prodNum)) {
    throw new ClientError(400, 'quantity and productId need to be positive integers.');
  }
  const cartToken = req.headers['x-access-token'];
  if (cartToken === 'null') {
    const sql = `
    insert into "carts"
         values (default)
      returning *
      `;
    db.query(sql)
      .then(result => {
        const payload = { cartId: result.rows[0].cartId };
        const token = jwt.sign(payload, process.env.TOKEN_SECRET);
        const response = { payload, token };
        return response;
      })
      .then(response => {
        const newCartId = response.payload.cartId;
        const newToken = response.token;
        const sql = `
    insert into "cartItems" ("productId", "customizations", "quantity", "cartId")
         values ($1, $2, $3, $4)
      returning *
      `;
        const params = [productId, customizations, quantity, newCartId];
        db.query(sql, params)
          .then(result => {
            const cartDetails = result.rows[0];
            res.status(200).json({ cartDetails, newToken });
          })
          .catch(err => next(err));
      });
  } else {
    const payload = jwt.verify(cartToken, process.env.TOKEN_SECRET);
    const cartId = payload.cartId;
    const sqlCart = `
      select "productId",
             "customizations",
             "cartItemsId",
             "quantity"
        from "cartItems"
       where "productId" = $1;
       `;
    const params = [productId];
    db.query(sqlCart, params)
      .then(result => {
        const newItem = Object.values(customizations);
        const numQuantity = JSON.parse(quantity);
        for (let i = 0; i < result.rows.length; i++) {
          const cartItemId = result.rows[i].cartItemsId;
          const cartQuantity = result.rows[i].quantity;
          const cartItem = Object.values(result.rows[i].customizations);
          if (equal(cartItem, newItem)) {
            const newQuantity = numQuantity + cartQuantity;
            const sqlItem = `
              update "cartItems"
                 set "quantity" = $1
               where "cartItemsId" = $2
               returning *;
              `;
            const params = [newQuantity, cartItemId];
            return db.query(sqlItem, params);
          }
        }
        const sqlNewItem = `
          insert into "cartItems" ("productId", "customizations", "quantity", "cartId")
               values ($1, $2, $3, $4)
            returning *;
            `;
        const params = [productId, customizations, quantity, cartId];
        return db.query(sqlNewItem, params);
      })
      .then(result => {
        res.status(200).json(result.rows[0]);
      })
      .catch(err => next(err));
  }
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
