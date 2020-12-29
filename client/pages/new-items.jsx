import React from 'react';

function Product(props) {
  const { pictureUrl, productName, price, productId } = props.product;
  return (
    <div className='col-6'>
      <a href={`#details?productId=${productId}`}>
        <div className="card mb-3 shadow-sm text-center">
          <img className='img-no-detail' src={pictureUrl}></img>
          <div className="card-body">
            <h5 className="card-title">{productName}</h5>
            <h5 className='price'>{`$${price}`}</h5>
          </div>
        </div>
      </a>
    </div>
  );
}

function NewItems(props) {

  return (
    props.products.map((product, index) => {
      return (
        <Product
          key={product.productId}
          product={product}
          />
      );
    }
    )
  );
}

export default NewItems;
