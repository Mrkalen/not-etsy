import React from 'react';

export default function ThumbnailGallery(props) {
  console.log(props.products);
  return (
    <>
      <div className='carousel-title text-center'>
        <a href={props.titleLink}>
          <h2>{props.title}</h2>
        </a>
      </div>
      <div className='row m-auto d-flex align-items-center'>
        {props.products.map((product, index) => {
          let display = '';
          if (index !== props.carouselIndex) {
            display = 'd-none';
          }
          return (
            <div key={product.productId} className={`col-4 d-flex justify-content-center ${display}`}>
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
