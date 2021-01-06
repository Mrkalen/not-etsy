import React from 'react';

export default class Header extends React.Component {

  render() {

    return (
      <div className='header'>
        <div>
          <h1 className='title'>Penguin Masterpieces</h1>
        </div>
        <nav className="nav header-nav">
          <a className="nav-link active" aria-current="page" href="#cart">
            <i className="fas fa-shopping-cart"></i>
          </a>
        </nav>
      </div>
    );
  }
}
