import React from 'react';
import Thumbnails from '../thumbnails';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { products: [] };
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    fetch('/api/products')
      .then(res => res.json())
      .then(products => this.setState({ products }))
      .catch(err => console.error('GET error', err.message));
  }

  render() {
    return (
      <>
        <div className='home-items'>
          <div className='carousel-title text-center'>
            <a href={'#new-items'}>
              <h2>New Items</h2>
            </a>
          </div>
          <div className='new-items-thumbnail row d-flex align-items-center'>
            {this.state.products.map((product, index) => {
              return (
              <Thumbnails key={`new-product-${product.productId}`} product={product} name='new' />
              );
            })}
          </div>
          <div className='carousel-title text-center'>
            <h2>Ornaments</h2>
          </div>
          <div className='ornaments-thumbnail row d-flex align-items-center'>
            {this.state.products.map((product, index) => {
              return (
                <Thumbnails key={`ornament-product-${product.productId}`} product={product} name='ornament' />
              );
            })}
          </div>
          <div className='carousel-title text-center'>
            <h2>Wall Decor</h2>
          </div>
          <div className='wall-decor-thumbnail row d-flex align-items-center'>
            {this.state.products.map((product, index) => {
              return (
                <Thumbnails key={`wall-decor-product-${product.productId}`} product={product} name='wall-decor' />
              );
            })}
          </div>
        </div>
      </>
    );
  }
}
