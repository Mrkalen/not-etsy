import React from 'react';
import CartItem from '../cart-item';

function Customization(props) {
  if (props.customizationId === 4) {
    return (
      <div className='col-4 pl-2 pr-0 pt-2 customizations text-left'>
        <p className='customizations-title m-0'>Customizations</p>
        <p className='custom-request m-0'>Custom Request:</p>
        <p className='customization m-0 p-1'>{props.customizations.customRequest}</p>
      </div>
    );
  } else if (props.customizationId === 2) {
    return (
      <div className='col-4 pl-2 pr-0 pt-2 customizations text-left'>
        <p className='customizations-title m-0'>Customizations</p>
        <div className='name-date d-flex'>
          <p>{`Name: ${props.customizations.name}`}</p>
          <p>{`Date: ${props.customizations.date}`}</p>
        </div>
        <p className='custom-request m-0'>Custom Request:</p>
        <p className='customization m-0 p-1'>{props.customizations.custom}</p>
      </div>
    );
  } else if (props.customizationId === 3) {
    return (
      <div className='col-4 pl-2 pr-0 pt-2 customizations text-left'>
        <p className='customizations-title m-0'>Customizations</p>
        <p className='brand m-0'>{`Brand: ${props.customizations.brand}`}</p>
        <p className='custom-request m-0'>Custom Request:</p>
        <p className='customization m-0 p-1'>{props.customizations.custom}</p>
      </div>
    );
  }
}

export default class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cartItems: [] };

    this.updateItem = this.updateItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
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

  updateItem(product) {
    const { productId, cartItemsId, quantity } = product;
    const token = localStorage.getItem('cart-token-storage');
    const updateQuantity = { quantity, productId, cartItemsId };

    fetch('/api/cartItems/quantity', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      },
      body: JSON.stringify(updateQuantity)
    })
      .then(res => res.json())
      .then(res => {
        const newItem = res;
        const newState = this.state.cartItems.slice();
        for (let i = 0; i < newState.length; i++) {
          if (newState[i].cartItemsId === newItem.cartItemsId) {
            newState.splice(i, 1, newItem);
            this.setState({ cartItems: newState });
            return;
          }
        }
      })
      .catch(err => console.error('Error:', err.message));
  }

  deleteItem(itemId) {
    const cartItemsId = { cartItemsId: itemId };
    const token = localStorage.getItem('cart-token-storage');

    fetch('/api/cartItems/delete', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      },
      body: JSON.stringify(cartItemsId)
    })
      .catch(err => {
        console.error('Error:', err.message);
      });
    const newState = this.state.cartItems.slice();
    for (let i = 0; i < newState.length; i++) {
      if (newState[i].cartItemsId === cartItemsId.cartItemsId) {
        newState.splice(i, 1);
        this.setState({ cartItems: newState });
      }
    }
  }

  render() {
    if (this.state.cartItems.length === 0) {
      return (
        <div>
          <p className='text-center'>You currently have no items in your cart.</p>
        </div>
      );
    } else {
      return (
        this.state.cartItems.map((product, index) => {
          return (
            <CartItem
              key={index}
              product={product}
              updateItem={this.updateItem}
              deleteItem={this.deleteItem}
            >
              <Customization customizationId={product.customizationId} customizations={product.customizations} />
            </CartItem>
          );
        }
        )
      );
    }
  }
}
