import React from 'react';

export default class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProduct: null,
      customizations: {
        name: '',
        date: '',
        custom: '',
        brand: ''
      },
      quantity: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getProduct();
  }

  handleChange() {
    const inputId = event.target.id;
    const emptyObject = {};
    const newState = Object.assign(this.state, emptyObject);
    if (inputId === 'custom-select-brand') {
      newState.customizations.brand = event.target.value;
      this.setState(newState);
    } else if (inputId === 'custom-request-brand') {
      newState.customizations.custom = event.target.value;
      this.setState(newState);
    } else if (inputId === 'custom-request-name') {
      newState.customizations.name = event.target.value;
      this.setState(newState);
    } else if (inputId === 'custom-request-date') {
      newState.customizations.date = event.target.value;
      this.setState(newState);
    } else if (inputId === 'custom-request-custom') {
      newState.customizations.custom = event.target.value;
      this.setState(newState);
    } else if (inputId === 'qty-select-custom') {
      newState.quantity = event.target.value;
      this.setState(newState);
    } else if (inputId === 'qty-select-brand') {
      newState.quantity = event.target.value;
      this.setState(newState);
    } else if (inputId === 'qty-select-name-date') {
      newState.quantity = event.target.value;
      this.setState(newState);
    } else if (inputId === 'custom-request-name-date') {
      newState.customizations.custom = event.target.value;
      this.setState(newState);
    }
  }

  handleSubmit() {
    event.preventDefault();
    const addToCart = {
      productId: this.state.currentProduct.productId,
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
        const emptyObject = {};
        const clearState = Object.assign(this.state, emptyObject);
        clearState.customizations.name = '';
        clearState.customizations.date = '';
        clearState.customizations.custom = '';
        clearState.customizations.brand = '';
        clearState.quantity = '';
        this.setState(clearState);
      })
      .catch(err => console.error('Error:', err.message));
  }

  getProduct() {
    const prodId = this.props.prodId;
    fetch(`/api/products/${prodId}`)
      .then(res => res.json())
      .then(product => {
        this.setState({ currentProduct: product });
      })
      .catch(err => console.error('GET error', err.message));
  }

  renderForm() {
    const { customizationId } = this.state.currentProduct;
    if (customizationId === 4) {
      return (
        <form onSubmit={this.handleSubmit}>
          <div className='text-left m-3'>
            <label htmlFor='custom-request-custom' className='custom-request'>
              Please enter any custom details:
            </label>
            <textarea onChange={this.handleChange} value={this.state.customizations.custom} className='shadow' cols='37' rows='3' type='text' id='custom-request-custom' name='custom-request' placeholder='Color, name, phrase, ...'></textarea>
          </div>
          <div className='row d-flex justify-content-around align-items-center'>
            <div className="input-group col-4">
              <select onChange={this.handleChange} value={this.state.quantity} required className="custom-select shadow pr-3 qty" id="qty-select-custom" aria-label="Example select with button addon">
                <option defaultValue value=''>QTY</option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary col-4 p-0 shadow cart">Add to cart</button>
          </div>
        </form>
      );
    } else if (customizationId === 3) {
      return (
        <form onSubmit={this.handleSubmit}>
          <div className='text-left m-3'>
            <div className="input-group mb-2 w-50 mx-auto">
              <select onChange={this.handleChange} value={this.state.customizations.brand} required className="custom-select team-name shadow" id="custom-select-brand">
                <option defaultValue value=''>Team Name</option>
                <option value="rams">Ram&apos;s</option>
                <option value="chargers">Chargers</option>
                <option value="raiders">Raiders</option>
                <option value="49ers">49ers</option>
                <option value="seahawks">Seahawks</option>
                <option value="dolphins">Dolphins</option>
              </select>
            </div>
            <label htmlFor='custom-request-brand' className='custom-request'>
              Please enter any custom details:
            </label>
            <textarea onChange={this.handleChange} value={this.state.customizations.custom} className="shadow" cols='37' rows='3' type='text' id='custom-request-brand' name='custom-request' placeholder='Color, name, phrase, ...'></textarea>
            <div className='row d-flex justify-content-around align-items-center'>
              <div className="input-group col-4">
                <select onChange={this.handleChange} value={this.state.quantity} className="custom-select shadow pr-3 qty" id="qty-select-brand" aria-label="Example select with button addon">
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
          </div>
        </form>
      );
    } else if (customizationId === 2) {
      return (
        <form onSubmit={this.handleSubmit}>
          <div className='text-left m-3'>
            <label htmlFor='custom-name-date' className='custom-name-date'>
              Please enter your last name and an est date:
          </label>
            <div className='custom-name-date-input d-flex justify-content-between'>
              <div className="input-group input-group-sm mb-3 pl-0 col-6">
                <input onChange={this.handleChange} value={this.state.customizations.name} type="text" className="form-control shadow" id='custom-request-name' placeholder='Name' aria-label="Input for name" aria-describedby="inputGroup-sizing-sm" />
              </div>
              <div className="input-group input-group-sm mb-3 pr-0 col-6 ">
                <input onChange={this.handleChange} value={this.state.customizations.date} type="text" className="form-control shadow" id='custom-request-date' placeholder='Date' aria-label="Input for date" aria-describedby="inputGroup-sizing-sm" />
              </div>
            </div>
            <label htmlFor='custom-request-name-date' className='custom-request'>
              Please enter any custom details:
            </label>
            <textarea onChange={this.handleChange} value={this.state.customizations.custom} className='shadow' cols='37' rows='3' type='text' id='custom-request-name-date' name='custom-request' placeholder='Color, name, phrase, ...'></textarea>
          </div>
          <div className='row d-flex justify-content-around align-items-center'>
            <div className="input-group col-4">
              <select onChange={this.handleChange} value={this.state.quantity} className="custom-select shadow pr-3 qty" id="qty-select-name-date" aria-label="Quantity select for items with name and date">
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

  render() {
    if (!this.state.currentProduct) return null;
    const { pictureUrl, productName, price, description } = this.state.currentProduct;
    return (
      <div className='col-12 text-center p-3'>
        <h4 className="card-title">{productName}</h4>
        <img className='img-detail img-fluid p-3' src={pictureUrl} alt={description}></img>
        <h5 className='price'>{`$${price}.00`}</h5>
        <div className='text-left m-3'>
          <h5>Description:</h5>
          <h5>{description}</h5>
        </div>
        {this.renderForm()}
      </div>

    );
  }
}
