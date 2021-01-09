import React from 'react';
import CustomCard from '../custom-card';
import BrandCard from '../brand-card';
import NameDateCard from '../name-date-card';

function CartItem(props) {
  const customizationId = props.product.customizationId;
  const { updateItem, deleteItem } = props;
  let item = null;
  if (customizationId === 4) {
    item = <CustomCard product={props.product} updateItem={updateItem} deleteItem={deleteItem}/>;
  } else if (customizationId === 3) {
    item = <BrandCard product={props.product} updateItem={updateItem} deleteItem={deleteItem}/>;
  } else if (customizationId === 2) {
    item = <NameDateCard product={props.product} updateItem={updateItem} deleteItem={deleteItem}/>;
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
    return (
      this.state.cartItems.map((product, index) => {
        return (
      <CartItem
          key={index}
          product={product}
          updateItem={this.updateItem}
          deleteItem={this.deleteItem}
      />
        );
      }
      )
    );
  }
}
