require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');

const app = express();

app.use(staticMiddleware);

app.get('/api/products', (req, res, next) => {
  // console.log(req.body);
});
app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
