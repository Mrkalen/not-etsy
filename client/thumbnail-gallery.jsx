import React from 'react';

export default function ThumbnailGallery(props) {

  return (
    <>
      <div className='carousel-title text-center'>
        <a href={props.titleLink}>
          <h2>{props.title}</h2>
        </a>
      </div>
      <div className='row m-auto d-flex align-items-center'>
        {props.products.map(product => {
          return (
            <div key={product.productId} className='col-4 d-flex justify-content-center'>
              <a href={`#details?productId=${product.productId}`}>
                <img src={product.pictureUrl} className='img-fluid home-image'></img>
              </a>
            </div>
          );
        })}
      </div>
    </>
  );
}
