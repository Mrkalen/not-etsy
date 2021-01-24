import React from 'react';

export default function ThumbnailGallery(props) {
  const { chevronClick, titleLink, title, name } = props;
  return (
    <>
      <div className='carousel-title text-center'>
        <a href={titleLink}>
          <h2>{title}</h2>
        </a>
      </div>
      <div className='d-flex flex-row align-items-center justify-content-between'>
      <i onClick={chevronClick} className="fas fa-chevron-left pr-2" id={`${name}Left`}></i>
      <div className='row d-flex justify-content-around'>
        {props.products.map((product, index) => {
          const arrLength = props.products.length;
          const carouselIndex = props.carouselIndex;
          let display = 'd-none';
          console.log('arrLength', arrLength - 3);
          console.log('index', index);
          console.log('carouselIndex', carouselIndex);
          if (index >= 0 && carouselIndex <= arrLength - 3) {

            if (index === carouselIndex || index === carouselIndex + 1 || index === carouselIndex + 2) {
              display = '';
            }
          } else if (index === arrLength - 2) {
            if (index === carouselIndex || index === carouselIndex + 1) {
              display = '';
            }
          }
          return (
            <div className={display} key={product.productId}>
              <div className='col-4 justify-content-center p-0'>
                <a href={`#details?productId=${product.productId}`}>
                  <img src={product.pictureUrl} className='home-image mx-2'></img>
                </a>
              </div>
            </div>
          );
        })}
      </div>
        <i onClick={chevronClick} className='fas fa-chevron-right pl-2' id={`${name}Right`}></i>
      </div>
    </>
  );
}
