import React from 'react';
import CartModal from './cart-modal';

export default class BrandForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 'd-none',
      quantity: '',
      customizations: {
        name: '',
        date: '',
        custom: '',
        brand: ''
      }
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.closeModal = this.closeModal.bind(this);
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
          display: '',
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

  closeModal() {
    this.setState({ display: 'd-none' });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className='m-3 media-form'>
          <div className="input-group mb-2 w-50 mx-auto media-form">
            <select onChange={this.handleChange} required value={this.state.customizations.brand} name='brand' className="custom-select team-name shadow-sm" id="custom-select-brand">
              <option defaultValue value=''>Team Name</option>
              <option value="rams">Ram&apos;s</option>
              <option value="chargers">Chargers</option>
              <option value="raiders">Raiders</option>
              <option value="49ers">49ers</option>
              <option value="seahawks">Seahawks</option>
              <option value="dolphins">Dolphins</option>
            </select>
          </div>
          <div className='text-left m-3 media-form'>
            <label htmlFor='custom-request-brand' className='custom-request heading'>
              Please enter any custom details:
            </label>
            <div className="input-group">
              <textarea onChange={this.handleChange} value={this.state.customizations.custom} name='custom' id='custom-request' className="form-control" aria-label="With textarea" placeholder='Color, name, phrase, ...'></textarea>
            </div>
          </div>
          <div className='row m-auto d-flex justify-content-around justify-content-md-between align-items-center'>
            <div className="input-group col-4 pl-2">
              <select onChange={this.handleChange} required value={this.state.quantity} name='quantity' className="custom-select shadow-sm pr-3 pb-0 qty" id="qty-select-brand" aria-label="Example select with button addon">
                <option defaultValue value=''>QTY</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary col-4 p-0 shadow-sm cart">Add to cart</button>
            <CartModal display={this.state.display} closeModal={this.closeModal} />
          </div>
        </div>
      </form>
    );
  }
}
