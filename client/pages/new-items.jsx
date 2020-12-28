import React from 'react';

export default class NewItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = { products: { props } };
  }

  render() {
    const image = this.state.products.props.img;
    const title = this.state.products.props.item;
    const price = this.state.products.props.price;
    return (
    <div className="card">
        <img src={image}></img>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{`$${price}`}</p>
          <a href="#" className="btn btn-primary">Go somewhere</a>
        </div>
    </div>
    );
  }
}
