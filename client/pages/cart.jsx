import React from 'react';
import CustomCard from '../custom-card';
import BrandCard from '../brand-card';
import NameDateCard from '../name-date-card';

function CartItems(props) {
  const customizationId = props.product.customizationId;
  let item = null;
  if (customizationId === 4) {
    item = <CustomCard product={props.product}/>;
  } else if (customizationId === 3) {
    item = <BrandCard product={props.product} />;
  } else if (customizationId === 2) {
    item = <NameDateCard product ={props.product} />;
  }
  return (
    <div className='card'>
      <div className='card-body col-12'>
        <div className='row d-flex align-center'>
        {item}
      </div>
    </div>

    </div>
  );
}

export default class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cartItems: [] };
  }

  componentDidMount() {
    this.getCart();
  }

  getCart() {
    const storedCartToken = localStorage.getItem('cart-token-storage');
    let clientToken = '';
    if (typeof storedCartToken !== 'string') {
      return 'no token';
    } else {
      clientToken = storedCartToken;
    }
    fetch('/api/cartItems', {
      method: 'get',
      headers: {
        'x-access-token': clientToken
      }
    })
      .then(res => res.json())
      .then(cartItems => {
        this.setState({ cartItems });
      });
  }

  render() {
    return (
      this.state.cartItems.map((product, index) => {
        return (
      <CartItems
          key={index}
          product={product}
      />
        );
      }
      )
    );
  }
}
