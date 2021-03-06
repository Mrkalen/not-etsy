require('dotenv/config');
const pg = require('pg');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
const ClientError = require('./client-error');
const jwt = require('jsonwebtoken');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
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
  if (!productId || !customizations || !quantity) {
    throw new ClientError(400, 'productId, customizations, and quantity are required.');
  } else if (!Number.isInteger(qtyNum) || !Number.isInteger(prodNum)) {
    throw new ClientError(400, 'quantity and productId need to be positive integers.');
  }
  const cartToken = req.headers['x-access-token'];
  Promise
    .resolve()
    .then(() => {
      if (cartToken !== 'null') {
        const payload = jwt.verify(cartToken, process.env.TOKEN_SECRET);
        const cartIdAndToken = { cartId: payload.cartId, token: cartToken };
        return cartIdAndToken;
      } else {
        const sql = `
    insert into "carts"
         values (default)
      returning *
      `;
        return db.query(sql)
          .then(result => {
            const payload = { cartId: result.rows[0].cartId };
            const token = jwt.sign(payload, process.env.TOKEN_SECRET);
            const cartIdAndToken = { cartId: payload.cartId, token: token };
            return cartIdAndToken;
          });
      }
    })
    .then(cartIdAndToken => {
      const { cartId, token } = cartIdAndToken;
      const sqlItem = `
              update "cartItems"
                 set "quantity" = ("quantity" + $1)
               where "cartId" = $2
                 and "productId" = $3
                 and "customizations" @> $4::jsonb
                 and "customizations" <@ $4::jsonb
           returning *;
              `;
      const params = [quantity, cartId, productId, customizations];
      return db.query(sqlItem, params)
        .then(res => {
          const cartItem = res.rows[0];
          if (cartItem) {
            return ({ cartItem, token });
          } else {
            const sqlNewItem = `
      insert into "cartItems" ("productId", "customizations", "quantity", "cartId")
           values ($1, $2, $3, $4)
        returning *;
        `;
            const params = [productId, customizations, quantity, cartId];
            return db.query(sqlNewItem, params)
              .then(res => {
                const cartItem = res.rows[0];
                return ({ cartItem, token });
              });
          }
        });
    })
    .then(cartItemAndToken => {
      const { cartItem, token } = cartItemAndToken;
      res.status(201).json({ cartItem, token });
    })
    .catch(err => next(err));

});

app.get('/api/cartItems', (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return null;
  }
  const payload = jwt.verify(token, process.env.TOKEN_SECRET);
  const cartId = payload.cartId;

  const sql = `
    select *
      from "cartItems"
      join "products" using ("productId")
     where "cartId" = $1;
  `;
  const params = [cartId];
  db.query(sql, params)
    .then(result => {
      const cartItems = result.rows;
      res.status(200).json(cartItems);
    })
    .catch(err => next(err));
});

app.post('/api/cartItems/quantity', (req, res, next) => {
  const { quantity, productId, cartItemsId } = req.body;
  const qtyNum = parseInt(quantity, 10);
  const prodNum = parseInt(productId, 10);
  const cartNum = parseInt(cartItemsId, 10);
  if (!productId || !quantity || !cartItemsId) {
    throw new ClientError(400, 'productId, cartItemsId, and quantity are required.');
  } else if (!Number.isInteger(qtyNum) || !Number.isInteger(prodNum) || !Number.isInteger(cartNum)) {
    throw new ClientError(400, 'quantity and productId need to be positive integers.');
  }
  const sql = `
    with "updatedItem" as (
  update "cartItems"
     set "quantity" = $1
   where "cartItemsId" = $2
  returning *
   )
  select *
    from "updatedItem"
    join "products" using ("productId")
 `;
  const params = [quantity, cartItemsId];
  db.query(sql, params)
    .then(result => {
      const cartItem = result.rows[0];
      res.status(201).json(cartItem);
    })
    .catch(err => next(err));
});

app.delete('/api/cartItems/delete', (req, res, next) => {
  const token = req.headers['x-access-token'];
  const payload = jwt.verify(token, process.env.TOKEN_SECRET);
  const { cartId } = payload;
  const cartItemsId = req.body.cartItemsId;
  const cartNum = parseInt(cartItemsId, 10);
  if (!cartItemsId) {
    throw new ClientError(400, 'cartItemsId is required.');
  } else if (!Number.isInteger(cartNum)) {
    throw new ClientError(400, 'cartItemsId needs to be a positive integers.');
  }
  const sql = `
    delete from "cartItems"
          where "cartItemsId" = $1
            and "cartId" = $2
      returning *;
            `;
  const params = [cartItemsId, cartId];
  db.query(sql, params)
    .then(result => {
      res.sendStatus(204);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
