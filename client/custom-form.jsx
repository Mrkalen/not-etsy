import React, { useState } from 'react';
import CartModal from './cart-modal';

export default function CustomForm(props) {
  const [display, setDisplay] = useState('d-none');
  const [quantity, setQuantity] = useState('');
  const [custom, setCustom] = useState('');

  function useHandleChange() {
    const { name, value } = event.target;
    if (name === 'quantity') {
      setQuantity(value);
      return;
    }
    setCustom(value);
  }

  function useHandleSubmit() {
    event.preventDefault();
    const addToCart = {
      productId: props.product.productId,
      customizations: { custom: custom },
      quantity: quantity
    };
    const storedCartToken = localStorage.getItem('cart-token-storage');
    let clientToken = '';
    if (typeof storedCartToken !== 'string') {
      clientToken = null;
    } else {
      clientToken = storedCartToken;
    }
    fetch('/api/cartItems', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': clientToken
      },
      body: JSON.stringify(addToCart)
    })
      .then(res => res.json())
      .then(res => {
        const cartTokenStorage = (res.token);
        if (cartTokenStorage !== undefined) {
          localStorage.setItem('cart-token-storage', cartTokenStorage);
        }

      })
      .then(() => {
        setDisplay('');
        setQuantity('');
        setCustom('');
      })
      .catch(err => console.error('Error:', err.message));
  }

  function useCloseModal() {
    setDisplay('d-none');
  }

  return (
    <form onSubmit={useHandleSubmit}>
      <div className='text-left mr-0 m-3'>
        <label htmlFor='custom-request-custom' className='custom-request heading'>
          Please enter any custom details:
            </label>
        <div className="input-group">
          <textarea onChange={useHandleChange} value={custom} name='custom' id='custom-request' className="form-control" aria-label="With textarea" placeholder='Color, name, phrase, ...'></textarea>
        </div>
      </div>
      <div className='row m-auto d-flex justify-content-around justify-content-md-between align-items-center'>
        <div className="input-group col-4">
          <select onChange={useHandleChange} required value={quantity} name='quantity' className="custom-select shadow-sm pr-3 pb-0 qty" id="qty-select-custom" aria-label="Example select with button addon">
            <option defaultValue value=''>QTY</option>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary col-4 p-0 shadow-sm cart">Add to cart</button>
        <CartModal display={display} closeModal={useCloseModal} />
      </div>
    </form>
  );
}
