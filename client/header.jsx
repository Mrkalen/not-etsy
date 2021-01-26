import React from 'react';

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.clicked();
  }

  render() {

    return (
      <div className='header'>
        <div>
          <h1 className='title'>Happy Hour Homemade</h1>
        </div>
        <nav className="nav header-nav d-flex justify-content-between mb-3">
          <div className="dropdown">
            <button onClick={this.handleClick} className="btn" type="button">
              <i className='fas fa-bars'></i>
            </button>
          </div>
          <a className="nav-link active" aria-current="page" href="#cart">
            <i className="fas fa-shopping-cart"></i>
          </a>
        </nav>
      </div>
    );
  }
}
