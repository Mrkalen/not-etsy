import React from 'react';
import ThumbnailGallery from '../thumbnail-gallery';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      newIndex: 1,
      ornamentIndex: 0,
      wallDecorIndex: 0
    };
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
    const ornaments = this.state.products.filter(product => {
      return (product.categoryId === 1);
    });
    const wallDecor = this.state.products.filter(product => {
      return (product.categoryId === 3);
    });
    return (
      <>
      <div className='container'>
        <div className='home-items'>
          <ThumbnailGallery title='New Items' titleLink='#new-items' products={this.state.products} carouselIndex={this.state.newIndex} />
          <ThumbnailGallery title='Ornaments' titleLink='#ornaments' products={ornaments} carouselIndex={this.state.ornamentIndex} />
          <ThumbnailGallery title='Wall Decor' titleLink='#wall-decor' products={wallDecor} carouselIndex={this.state.wallDecorIndex} />
        </div>
        </div>
      </>
    );
  }
}
