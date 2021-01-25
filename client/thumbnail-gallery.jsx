import React from 'react';

export default class ThumbnailGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstPosition: 0,
      secondPosition: 1,
      thirdPosition: 2
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const id = event.target.id;
    const arrLength = this.props.products.length;
    const firstPosition = this.state.firstPosition;
    const secondPosition = this.state.secondPosition;
    const thirdPosition = this.state.thirdPosition;
    if (id === 'chevRight') {
      if (firstPosition === arrLength - 1) {
        this.setState({
          firstPosition: 0,
          secondPosition: 1,
          thirdPosition: 2
        });
      } else if (firstPosition === arrLength - 2) {
        this.setState({
          firstPosition: firstPosition + 1,
          secondPosition: 0,
          thirdPosition: 1
        });
      } else if (firstPosition === arrLength - 3) {
        this.setState({
          firstPosition: firstPosition + 1,
          secondPosition: secondPosition + 1,
          thirdPosition: 0
        });
      } else {
        this.setState({
          firstPosition: firstPosition + 1,
          secondPosition: secondPosition + 1,
          thirdPosition: thirdPosition + 1
        });
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
    const product1 = products[0];
    console.log('product 1', product1.productId);
    const display = '';
    const { firstPosition, secondPosition, thirdPosition } = this.state;
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
            <div className={display}>
              <div className='col-4 justify-content-center p-0'>
                <a href={`#details?productId=${products.productId}`}>
                  <img src={products.pictureUrl} className='home-image mx-2'></img>
                </a>
              </div>
            </div>
            <div className={display}>
              <div className='col-4 justify-content-center p-0'>
                <a href={`#details?productId=${products.productId}`}>
                  <img src={products.pictureUrl} className='home-image mx-2'></img>
                </a>
              </div>
            </div>
            <div className={display}>
              <div className='col-4 justify-content-center p-0'>
                <a href={`#details?productId=${products.productId}`}>
                  <img src={products.pictureUrl} className='home-image mx-2'></img>
                </a>
              </div>
            </div>
          </div>
          <i onClick={this.handleClick} className='fas fa-chevron-right pl-2' id='chevRight'></i>
        </div>
      </>
    );
  }
}
