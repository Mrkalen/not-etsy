import React from 'react';

export default class CartItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { quantity: this.props.product.quantity };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange() {
    const { name, value } = event.target;
    if (name === 'quantity') {
      const newQuantity = value;
      this.setState({ quantity: newQuantity });
    }
  }

  handleSubmit() {
    event.preventDefault();
    const quantity = this.state.quantity;
    const { productId, cartItemsId } = this.props.product;
    const updateQuantity = { quantity, productId, cartItemsId };
    this.props.updateItem(updateQuantity);
  }

  handleClick() {
    const { cartItemsId } = this.props.product;
    this.props.deleteItem(cartItemsId);
  }

  render() {
    const { pictureUrl, productName, price, quantity, description } = this.props.product;
    return (
      <div className='card'>
        <div className='card-body col-12'>
          <div className='row d-flex align-center'>
            <div className="card">
              <div className="card-header text-left pl-2">
                {productName}
              </div>
              <div className="card-body d-flex pr-1 py-0 justify-content-between">
                <div className='col-4 p-0'>
                  <img src={pictureUrl} className='img-fluid' alt={description}></img>
                </div>
                {
                  this.props.children
                }
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
                  <button onClick={this.handleClick} className='btn h-50 d-flex align-items-center justify-content-between delete'>
                    <p className='m-0 w-100'>Delete</p>
                    <div className='w-100'>
                      <i className="fas fa-trash-alt update-symbol"></i>
                    </div>
                  </button>
                </div>
              </div>
              <div className="card-footer p-2 d-flex justify-content-between">
                <p className='price text-left m-0'>{`Price $${price}.00 x Quantity ${quantity} `}</p>
                <p className='total text-right m-0'>{`Total: $${price * quantity}.00`}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
