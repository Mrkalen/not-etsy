import React from 'react';
import Header from './header';
import NewItems from './pages/new-items';
import parseRoute from './lib/parse-route';
import Details from './pages/details';
import Cart from './pages/cart';
import Home from './pages/home';
import Menu from './menu';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuToggle: false,
      products: [],
      route: parseRoute(window.location.hash)
    };

    this.menuClick = this.menuClick.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      const newRoute = parseRoute(window.location.hash);
      this.setState({ route: newRoute });
    });
  }

  menuClick() {
    const toggle = this.state.menuToggle;
    this.setState({ menuToggle: !toggle });
  }

  renderPage() {
    const prodId = this.state.route.params.get('productId');
    const { route } = this.state;
    if (route.path === 'new-items') {
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
    } else if (route.path === '') {
      return (
        <Home />
      );
    }
  }

  render() {
    const toggle = this.state.menuToggle;
    let menu = 'd-none';
    if (toggle) {
      menu = '';
    }

    return (
      <>
        <div onClick={this.menuClick} className={`menu-background ${menu}`}></div>
        <Header clicked={this.menuClick} />
        <Menu display={menu} clicked={this.menuClick} />
        { this.renderPage()}
      </>
    );
  }
}
