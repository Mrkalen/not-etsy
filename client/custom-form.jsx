import React from 'react';

export default class CustomForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProduct: null,
      quantity: '',
      customizations: {
        name: '',
        date: '',
        custom: '',
        brand: ''
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange() {
    const { name, value } = event.target;
    if (name === 'quantity') {
      const newQuantity = value;
      this.setState({ quantity: newQuantity });
      return;
    }
    const customizationsCopy = Object.assign({}, this.state.customizations);
    customizationsCopy[name] = value;
    this.setState({ customizations: customizationsCopy });
  }

  handleSubmit() {
    event.preventDefault();
    const addToCart = {
      productId: this.props.product.productId,
      customizations: this.state.customizations,
      quantity: this.state.quantity
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
        const newState = {
          quantity: '',
          customizations: {
            name: '',
            date: '',
            custom: '',
            brand: ''
          }
        };
        this.setState(newState);
      })
      .catch(err => console.error('Error:', err.message));
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className='text-left m-3'>
          <label htmlFor='custom-request-custom' className='custom-request heading'>
            Please enter any custom details:
            </label>
          <div className="input-group">
            <textarea onChange={this.handleChange} value={this.state.customizations.custom} name='custom' id='custom-request-brand' className="form-control copy" aria-label="With textarea" placeholder='Color, name, phrase, ...'></textarea>
          </div>
        </div>
        <div className='row d-flex justify-content-around align-items-center'>
          <div className="input-group col-4">
            <select onChange={this.handleChange} required value={this.state.quantity} name='quantity' className="custom-select shadow-sm pr-3 pb-0 qty copy" id="qty-select-custom" aria-label="Example select with button addon">
              <option defaultValue value=''>QTY</option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary col-4 p-0 shadow-sm cart">Add to cart</button>
        </div>
      </form>
    );
  }
}
