import React from 'react';

export default class Header extends React.Component {

  render() {

    return (
      <div className='header'>
        <div>
          <h1 className='title'>Penguin Masterpieces</h1>
        </div>
        <nav className="nav header-nav d-flex justify-content-between">
          <div className="dropdown">
            <button className="btn" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i className="fas fa-bars"></i>
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a className="dropdown-item" href=''>Home</a>
              <a className="dropdown-item" href="#new-items">New Items</a>
              <a className="dropdown-item">Ornaments</a>
              <a className="dropdown-item">Wall Decor</a>
              <a className="dropdown-item" href="#cart">Cart</a>
            </div>
          </div>
          <a className="nav-link active" aria-current="page" href="#cart">
            <i className="fas fa-shopping-cart"></i>
          </a>
        </nav>
      </div>
    );
  }
}
