import React from 'react';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggledOn: false,
      search: ''
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick() {
    this.setState({ isToggledOn: !this.state.isToggledOn });
  }

  handleChange() {
    this.setState({ search: event.target.value });
  }

  render() {
    const toggle = this.state.isToggledOn;
    let menu = 'hidden';
    if (toggle) {
      menu = 'open';
    } else {
      menu = 'hidden';
    }
    return (
      <div className='header'>
        <div className='title'>
          <h1>Penguin Masterpieces</h1>
        </div>
        <div className="container nav">
          <i onClick={this.handleClick} className="bars fas fa-bars"></i>
          <div>
            <input className='search' type='text' value={this.state.search} onChange={this.handleChange} placeholder={'Search...'}></input>
            <i className="fas fa-search"></i>
          </div>
          <i className="fas fa-shopping-cart"></i>
        </div>
        <div className={`menu ${menu}`}>
          <h3 onClick={this.handleClick}>Menu</h3>
          <h4 onClick={this.handleClick}>About</h4>
          <h4 onClick={this.handleClick}>Get Started</h4>
          <h4 onClick={this.handleClick}>Sign In</h4>
        </div>
        <div onClick={this.handleClick} className={`theShade ${menu}`}></div>
      </div>
    );
  }
}
