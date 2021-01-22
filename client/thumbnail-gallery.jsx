import React from 'react';

export default function ThumbnailGallery(props) {
  return (
    <>
      <div className='carousel-title text-center'>
        <a href={props.titleLink}>
          <h2>{props.title}</h2>
        </a>
      </div>
      <div className='d-flex flex-row align-items-center justify-content-between'>
      <i className="fas fa-chevron-left"></i>
      <div className='row d-flex justify-content-around w-100 px-3'>
        {props.products.map((product, index) => {
          console.log('index', index);
          const carIndex = props.carouselIndex;
          console.log('carIndex', carIndex);
          console.log('carIndex 1', carIndex + 1);
          console.log('carIndex 2', carIndex + 2);

          let display = 'd-none';
          if (index === carIndex || index === carIndex + 1 || index === carIndex + 2) {
            display = '';
          }
          return (
            <div className={display} key={product.productId}>
              <div className='col-4 justify-content-center p-0'>
                <a href={`#details?productId=${product.productId}`}>
                  <img src={product.pictureUrl} className='home-image'></img>
                </a>
              </div>
            </div>
          );
        })}
      </div>
      <i className="fas fa-chevron-right"></i>
      </div>
    </>
  );
}
