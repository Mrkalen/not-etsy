import React from 'react';

export default class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProduct: null
    };
  }

  componentDidMount() {
    this.getProduct();
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
    if (customizationId === '4') {
      return (
      <div className='text-left m-3'>
        <label htmlFor='custom-request' className='custom-request'>
          Please enter any custom details:
            </label>
        <textarea cols='37' rows='3' type='text' id='custom-reqest' name='custom-request' placeholder='Color, name, phrase, ...'></textarea>
      </div>
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
