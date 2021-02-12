import React from 'react';

export default class Menu extends React.Component {

  render() {
    const display = this.props.display;

    return (
      <div className={`menu container ${display}`}>
        <div className='menu-body'>
          <div className="menu-items ml-2" aria-labelledby="dropdownMenuButton">
            <a onClick={this.props.clicked} className="menu-item" href=''>Home</a>
            <a onClick={this.props.clicked} className="menu-item" href="#new-items">New Items</a>
            <a onClick={this.props.clicked} className="menu-item" href="#ornaments">Ornaments</a>
            <a onClick={this.props.clicked} className="menu-item" href="#wall-decor">Wall Decor</a>
            <a onClick={this.props.clicked} className="menu-item" href="#cart">Cart</a>
          </div>
        </div>
      </div>
    );
  }
}
