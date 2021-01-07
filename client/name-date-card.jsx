import React from 'react';

export default class NameDateCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { quantity: this.props.product.quantity };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange() {
    const { name, value } = event.target;
    if (name === 'quantity') {
      const newQuantity = value;
      this.setState({ quantity: newQuantity });
    }
  }

  handleSubmit() {
    const quantity = this.state.quantity;
    const { productId, cartItemsId } = this.props.product;
    const token = localStorage.getItem('cart-token-storage');
    const updateQuantity = { quantity, productId, cartItemsId };

    fetch('/api/cartItems/quantity', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      },
      body: JSON.stringify(updateQuantity)
    });
  }

  render() {
    const { pictureUrl, productName, customizations, price, quantity, description } = this.props.product;
    const { custom, name, date } = customizations;
    return (
      <>
        <div className="card">
          <div className="card-header text-left pl-2">
            {productName}
          </div>
          <div className="card-body d-flex pr-1 py-0 justify-content-between">
            <div className='col-4 p-0'>
              <img src={pictureUrl} className='img-fluid' alt={description}></img>
            </div>
            <div className='col-4 pl-2 pr-0 pt-2 customizations text-left'>
              <p className='customizations-title m-0'>Customizations</p>
              <div className='name-date d-flex'>
                <p>{`Name: ${name}`}</p>
                <p>{`Date: ${date}`}</p>
              </div>
              <p className='custom-request m-0'>Custom Request:</p>
              <p className='customization m-0 p-1'>{custom}</p>
            </div>
            <div className='updates d-flex flex-column justify-content-around'>
              <form className='h-100 d-flex flex-column justify-content-around' onSubmit={this.handleSubmit}>
                <div className='quantity-update d-flex'>
                  <div className='d-flex align-items-center pr-1'>
                    <p className='quantity m-0'>Quantity</p>
                  </div>
                  <select onChange={this.handleChange} required value={this.state.quantity} name='quantity' className="custom-select pr-4 pl-1 py-0 qty-update" aria-label="Quantity Select">
                    <option defaultValue className='qty-option' value=''>QTY</option>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                  </select>
                </div>
                <button type='submit' className='btn p-0 w-100 d-flex update'>
                  <p className='m-0 w-100 d-flex justify-content-start'>Update</p>
                  <div className='w-100 d-flex justify-content-start'>
                    <i className="fas fa-redo-alt update-symbol"></i>
                  </div>
                </button>
              </form>
              <div className='h-50 d-flex align-items-center justify-content-between delete'>
                <p className='m-0 w-100'>Delete</p>
                <div className='w-100'>
                  <i className="fas fa-trash-alt update-symbol"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer p-2 d-flex justify-content-between">
            <p className='price text-left m-0'>{`Price $${price}.00 x Quantity ${quantity} `}</p>
            <p className='total text-right m-0'>{`Total: $${price * quantity}.00`}</p>
          </div>
        </div>
      </>
    );
  }
}
