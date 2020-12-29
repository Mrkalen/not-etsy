import React from 'react';

export default function Custom1(props) {

  const image = props.product.pictureUrl;
  const title = props.product.productName;
  const price = props.product.price;
  return (
    <div className='col-6'>
        <div className="card mb-3 shadow-sm text-center">
          <img src={image}></img>
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <h5 className='price'>{`$${price}`}</h5>
          </div>
        </div>
    </div>
  );
}
