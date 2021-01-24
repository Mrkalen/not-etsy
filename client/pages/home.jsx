import React from 'react';
import ThumbnailGallery from '../thumbnail-gallery';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      newIndex: 0,
      ornamentIndex: 0,
      wallDecorIndex: 0
    };

    this.handleClick = this.handleClick.bind(this);
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

  handleClick() {
    let { newIndex, ornamentIndex, wallDecorIndex } = this.state;
    const { id } = event.target;
    if (id === 'newItemsRight') {
      this.setState({ newIndex: newIndex += 1 });
    } else if (id === 'newItemsLeft') {
      this.setState({ newIndex: newIndex -= 1 });
    } else if (id === 'ornamentsRight') {
      this.setState({ ornamentIndex: ornamentIndex += 1 });
    } else if (id === 'ornamentsLeft') {
      this.setState({ ornamentIndex: ornamentIndex -= 1 });
    } else if (id === 'wallDecorRight') {
      this.setState({ wallDecorIndex: wallDecorIndex += 1 });
    } else if (id === 'wallDecorLeft') {
      this.setState({ wallDecorIndex: wallDecorIndex -= 1 });
    }
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
          <ThumbnailGallery name='newItems' title='New Items' titleLink='#new-items' products={this.state.products} carouselIndex={this.state.newIndex} chevronClick={this.handleClick} />
            <ThumbnailGallery name='ornaments' title='Ornaments' titleLink='#ornaments' products={ornaments} carouselIndex={this.state.ornamentIndex} chevronClick={this.handleClick} />
              <ThumbnailGallery name='wallDecor' title='Wall Decor' titleLink='#wall-decor' products={wallDecor} carouselIndex={this.state.wallDecorIndex} chevronClick={this.handleClick} />
        </div>
        </div>
      </>
    );
  }
}
