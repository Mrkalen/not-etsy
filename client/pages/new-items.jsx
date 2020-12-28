import React from 'react';

export default function NewItems(props) {

  const image = props.img;
  const title = props.item;
  const price = props.price;
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
