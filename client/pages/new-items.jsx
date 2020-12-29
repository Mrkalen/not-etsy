import React from 'react';

export default function NewItems(props) {
  const image = props.product.pictureUrl;
  const title = props.product.productName;
  const price = props.product.price;
  const customization = props.product.customizationId;
  const productId = props.product.productId;
  return (
    <div className='col-6'>
      <a href={`#details${customization}?productId=${productId}`}>
        <div className="card mb-3 shadow-sm text-center">
          <img className='img-no-detail' src={image}></img>
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
          <h5 className='price'>{`$${price}`}</h5>
          </div>
        </div>
        </a>
      </div>
  );
}
