import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Home from './pages/home';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isToggledOn: false };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ isToggledOn: !this.state.isToggledOn });
  }

  render() {
    const toggle = this.state.isToggledOn;
    let menu = 'hidden';
    let drawer = 'open';
    if (toggle) {
      drawer = 'hidden';
      menu = 'open';
    } else {
      drawer = 'open';
      menu = 'hidden';
    }
    return (
      <div className='header'>
        <div className='title'>
          <h1>Penguin Masterpieces</h1>
        </div>
        <div className="navbar">
          <div className={`drawer ${drawer}`}>
            <i onClick={this.handleClick} className="fas fa-bars"></i>
          </div>
          <div className={`menu ${menu}`}>
            <h3 onClick={this.handleClick}>Menu</h3>
            <h4 onClick={this.handleClick}>About</h4>
            <h4 onClick={this.handleClick}>Get Started</h4>
            <h4 onClick={this.handleClick}>Sign In</h4>
          </div>
          <div onClick={this.handleClick} className={`theShade ${menu}`}></div>
        </div>
      </div>
    );
  }
}
