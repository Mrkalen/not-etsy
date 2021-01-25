import React from 'react';

export default class ThumbnailGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      carouselIndex: 0
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const id = event.target.id;
    const arrLength = this.props.products.length;
    const carouselIndex = this.state.carouselIndex;
    if (id === 'chevRight') {
      if (carouselIndex === arrLength - 1) {
        this.setState({ carouselIndex: 0 });
      } else {
        this.setState({ carouselIndex: carouselIndex + 1 });
      }
    } else if (id === 'chevLeft') {
      if (carouselIndex === 0) {
        this.setState({ carouselIndex: arrLength - 1 });
      } else {
        this.setState({ carouselIndex: carouselIndex - 1 });
      }
    }
  }

  render() {
    const { titleLink, title, products } = this.props;
    return (
    <>
      <div className='carousel-title text-center'>
        <a href={titleLink}>
          <h2>{title}</h2>
        </a>
      </div>
      <div className='d-flex flex-row align-items-center justify-content-between'>
      <i onClick={this.handleClick} className="fas fa-chevron-left pr-2" id='chevLeft'></i>
      <div className='row d-flex justify-content-around'>
        {products.map((product, index) => {
          const carouselIndex = this.state.carouselIndex;
          const arrLength = products.length;
          let display = 'd-none';
          if (arrLength < 3) {
            display = '';
          } else {
            if (carouselIndex >= 0 && carouselIndex <= arrLength - 3) {
              if (index === carouselIndex || index === carouselIndex + 1 || index === carouselIndex + 2) {
                display = '';
              }
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
        <i onClick={this.handleClick} className='fas fa-chevron-right pl-2' id='chevRight'></i>
      </div>
    </>
    );
  }
}
