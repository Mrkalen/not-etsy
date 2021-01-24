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
    let newState = Object.create(this.state.carouselIndex, {});
    if (id === 'chevRight') {
      this.setState({ carouselIndex: newState += 1 });
    } else if (id === 'chevLeft') {
      this.setState({ carouselIndex: newState -= 1 });
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
          console.log(product);
          console.log(product.productId);
          const arrLength = product.length;
          const display = '';

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
