import React from 'react';
import Header from './header';
import NewItems from './pages/new-items';
import parseRoute from './lib/parse-route';
import Details from './pages/details';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      route: parseRoute(window.location.hash)
    };

  }

  componentDidMount() {
    this.getProducts();
    window.addEventListener('hashchange', () => {
      const newRoute = parseRoute(window.location.hash);
      this.setState({ route: newRoute });
    });
  }

  getProducts() {
    fetch('/api/products')
      .then(res => res.json())
      .then(products => this.setState({ products }))
      .catch(err => console.error('GET error', err.message));
  }

  renderPage() {
    const prodId = this.state.route.params.get('productId');
    const { route, products } = this.state;
    if (route.path === '') {
      return (
      <div className='row'>
      {
      <NewItems products={products} />
    })
  </div>
      );
    } else if (route.path === 'details') {
      return (
        <Details prodId={prodId} />
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
