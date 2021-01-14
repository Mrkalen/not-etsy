import React from 'react';

export default function Thumbnails(props) {
  if (props.name === 'new') {
    return (
      <div className='col-4 d-flex justify-content-center'>
        <a href={`#details?productId=${props.product.productId}`}>
          <img src={props.product.pictureUrl} className='img-fluid home-image'></img>
        </a>
      </div>
    );
  } else if (props.name === 'ornament') {
    if (props.product.categoryId === 1) {
      return (
        <div className='col-4 d-flex justify-content-center'>
          <a href={`#details?productId=${props.product.productId}`}>
            <img src={props.product.pictureUrl} className='img-fluid home-image'></img>
          </a>
        </div>
      );
    } else {
      return null;
    }
  } else if (props.name === 'wall-decor') {
    if (props.product.categoryId === 3) {
      return (
        <div className='col-4 d-flex justify-content-center'>
          <a href={`#details?productId=${props.product.productId}`}>
            <img src={props.product.pictureUrl} className='img-fluid home-image'></img>
          </a>
        </div>
      );
    } else {
      return null;
    }
  }
}
