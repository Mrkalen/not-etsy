import React from 'react';
import Header from './header';
import NewItems from './pages/new-items';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
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
    const products = this.state.products;
    return (
      <>
      <Header />
        <div className='row'>
      {
      products.reverse().map((product, index) => {
        return <NewItems key={index} item={product.productName} price={product.price} img={product.pictureUrl}/>;
      })

      }
      </div>
      </>
    );
  }
}
