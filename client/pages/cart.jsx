import React from 'react';

function CartItems() {
  return (
    <div className='col-12'>
      <div className='card'>
      </div>
    </div>
  );
}

export default class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cartItems: [] };
  }

  render() {
    return (
      <CartItems />
    );
  }
}
