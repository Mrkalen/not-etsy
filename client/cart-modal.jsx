import React from 'react';

export default class CartModal extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.closeModal();
  }

  render() {
    const display = this.props.display;

    return (
      <div className={`cart-modal ${display}`}>
        <div className='cart-modal-body'>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Thank you!</h5>
                <button onClick={this.handleClick} type="button" className="close" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Continue shopping, or go to cart?</p>
              </div>
              <div className="modal-footer">
                <a href='' onClick={this.handleClick}>
                  <button type="button" className="btn btn-secondary">Home</button>
                </a>
                <a href='#cart' onClick={this.handleClick}>
                  <button type="button" className="btn btn-primary">Cart</button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div >
    );
  }
}
