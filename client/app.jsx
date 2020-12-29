import React from 'react';
import Header from './header';
import NewItems from './pages/new-items';
import parseRoute from '../server/parse-route';
import Custom1 from './pages/custom1';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      route: parseRoute(window.location.hash),
      currentProduct: {}
    };

  }

  componentDidMount() {
    this.getProducts();
    window.addEventListener('hashchange', () => {
      const newRoute = parseRoute(window.location.hash);
      this.setState({ route: newRoute });
    });
    this.getProduct();
  }

  getProducts() {
    fetch('/api/products')
      .then(res => res.json())
      .then(products => this.setState({ products }))
      .catch(err => console.error('GET error', err.message));
  }

  getProduct() {
    const prodId = Number(this.state.route.id);
    fetch(`/api/product/${prodId}`)
      .then(res => res.json())
      .then(product => {
        this.setState({ currentProduct: product });
      })
      .catch(err => console.error('GET error', err.message));
  }

  renderPage() {

    const { route } = this.state;
    const products = this.state.products;

    if (route.path === '') {
      return (
      <div className='row'>
      {
    products.reverse().map((product, index) => {
      return <NewItems key={index} product={product} />;
    })
  }
  </div>
      );
    } else if (route.path === 'details4') {
      return (
        <Custom1 product={this.state.currentProduct} />
      );
    }
  }

  render() {

    return (
      <>
      <Header />
      { this.renderPage() }

      </>
    );
  }
}
