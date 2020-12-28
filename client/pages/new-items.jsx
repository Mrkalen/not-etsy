import React from 'react';

export default function NewItems(props) {

  const image = props.img;
  const title = props.item;
  const price = props.price;
  return (
      <div className='col-6'>
        <div className="card">
          <img src={image}></img>
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <a href="#" className="btn btn-primary">{`$${price}`}</a>
          </div>
        </div>
      </div>
  );
}
