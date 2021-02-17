import React, { useState, useEffect } from 'react';

function Product(props) {

  const { pictureUrl, productName, price, productId } = props.product;
  return (
    <div className='col-6 col-md-4 col-lg-3'>
      <a href={`#details?productId=${productId}`}>
        <div className="item-cards mb-3 shadow-sm text-center" style={{ height: 15 + 'rem' }}>
          <img className='card-img-top img-card' src={pictureUrl}></img>
          <div className="card-body p-2">
            <h6 className="card-title">{productName}</h6>
            <h6 className='price'>{`$${price}.00`}</h6>
          </div>
        </div>
      </a>
    </div>
  );
}

function Items(props) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(products => setProducts(products))
      .catch(err => console.error('GET error', err.message));
  }, []);

  let items = [];
  let title = '';
  if (props.route === 'new-items') {
    items = products;
    title = 'New Items';
  } else if (props.route === 'ornaments') {
    items = products.filter(product => {
      return (product.categoryId === 1);
    });
    title = 'Ornaments';
  } else if (props.route === 'wall-decor') {
    items = products.filter(product => {
      return (product.categoryId === 3);
    });
    title = 'Wall Decor';
  }

  return (
      <>
      <div className='category-title text-center w-100 mb-2'>
        <h2>{title}</h2>
      </div>
      <div className='container'>
        <div className='d-flex justify-content-center row m-auto mx-0'>
          {items.map(product => {
            return (
              <Product
                key={product.productId}
                product={product}
              />
            );
          })}
        </div>
      </div>
      </>
  );
}

export default Items;
