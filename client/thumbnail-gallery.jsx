import React from 'react';

export default class ThumbnailGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstPosition: 0
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const id = event.target.id;
    const arrLength = this.props.products.length;
    const firstPosition = this.state.firstPosition;
    if (id === 'chevRight') {
      if (firstPosition === arrLength - 1) {
        this.setState({ firstPosition: 0 });
      } else {
        this.setState({ firstPosition: firstPosition + 1 });
      }
    } else if (id === 'chevLeft') {
      if (firstPosition === 0) {
        this.setState({ firstPosition: arrLength - 1 });
      } else {
        this.setState({ firstPosition: firstPosition - 1 });
      }
    }
  }

  render() {
    const { titleLink, title, products } = this.props;
    const display = '';
    const { firstPosition } = this.state;
    let items = products.slice(firstPosition, firstPosition + 3);
    if (products.length < 3) {
      items = products;
    } else if (items.length === 2) {
      items = items.concat(products.slice(0, 1));
    } else if (items.length === 1) {
      items = items.concat(products.slice(0, 2));
    }
    return (
      <>
        <div className='carousel-title text-center'>
          <a href={titleLink}>
            <h2>{title}</h2>
          </a>
        </div>
        <div className='d-flex flex-row align-items-center justify-content-center'>
          <i onClick={this.handleClick} className="fas fa-chevron-left pr-2" id='chevLeft'></i>
          <div className='d-flex m-2'>
            {items.map((product, index) => {
              return (
                <div className={display} key={product.productId}>
                  <div className='col-4 justify-content-center p-0 m-0'>
                    <a href={`#details?productId=${product.productId}`}>
                      <img src={product.pictureUrl} className='home-image mx-2'></img>
                    </a>
                  </div>
                </div>
              );
            })
            }
          </div>
          <i onClick={this.handleClick} className='fas fa-chevron-right pl-2' id='chevRight'></i>
        </div>
      </>
    );
  }
}
