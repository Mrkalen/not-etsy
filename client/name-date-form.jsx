import React from 'react';

export default class NameDateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    fetch('api/cartItems', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': clientToken
      },
      body: JSON.stringify(addToCart)
    })
      .then(res => res.json())
      .then(res => {
        const cartTokenStorage = (res.newToken);
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
          <label htmlFor='custom-name-date' className='custom-name-date'>
            Please enter your last name and an est date:
          </label>
          <div className='custom-name-date-input d-flex justify-content-between'>
            <div className="input-group input-group-sm mb-3 pl-0 col-6">
              <input onChange={this.handleChange} required value={this.state.customizations.name} name='name' type="text" className="form-control shadow" id='custom-request-name' placeholder='Name' aria-label="Input for name" aria-describedby="inputGroup-sizing-sm" />
            </div>
            <div className="input-group input-group-sm mb-3 pr-0 col-6 ">
              <input onChange={this.handleChange} required value={this.state.customizations.date} name='date' type="text" className="form-control shadow" id='custom-request-date' placeholder='Date' aria-label="Input for date" aria-describedby="inputGroup-sizing-sm" />
            </div>
          </div>
          <label htmlFor='custom-request-name-date' className='custom-request'>
            Please enter any custom details:
            </label>
          <textarea onChange={this.handleChange} value={this.state.customizations.custom} name='custom' className='shadow' cols='37' rows='3' type='text' id='custom-request-name-date' placeholder='Color, name, phrase, ...'></textarea>
        </div>
        <div className='row d-flex justify-content-around align-items-center'>
          <div className="input-group col-4">
            <select onChange={this.handleChange} required value={this.state.quantity} name='quantity' className="custom-select shadow pr-3 qty" id="qty-select-name-date" aria-label="Quantity select for items with name and date">
              <option defaultValue value=''>QTY</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary col-4 p-0 shadow cart">Add to cart</button>
        </div>
      </form>
    );
  }
}
