import React from 'react';
import Header from './header';
import NewItems from './pages/new-items';
import parseRoute from './lib/parse-route';
import Details from './pages/details';
import Cart from './pages/cart';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      route: parseRoute(window.location.hash)
    };

  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      const newRoute = parseRoute(window.location.hash);
      this.setState({ route: newRoute });
    });
  }

  renderPage() {
    const prodId = this.state.route.params.get('productId');
    const { route } = this.state;
    if (route.path === '') {
      return (
        <div className='row'>
          { <NewItems />}
        </div>
      );
    } else if (route.path === 'details') {
      return (
        <Details prodId={prodId} />
      );
    } else if (route.path === 'cart') {
      return (
        <Cart />
      );
    }
  }

  render() {

    return (
      <>
        <Header />
        { this.renderPage()}

      </>
    );
  }
}
