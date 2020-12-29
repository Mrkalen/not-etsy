import React from 'react';

export default class Custom1 extends React.Component {
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

  render() {
    if (!this.state.currentProduct) return null;
    const { pictureUrl, productName, price, description } = this.state.currentProduct;
    return (
    <div className='col-12'>
        <div className="card my-3  shadow-sm text-center">
          <h4 className="card-title">{productName}</h4>
          <img src={pictureUrl} alt={description}></img>
          <div className="card-body">
            <h5 className='price'>{`$${price}`}</h5>
            <div className='text-left m-2'>
            <h5>Description:</h5>
            <h5 className='font-weight-normal'>{description}</h5>
            </div>
            <div className='text-left m-2 mt-5'>
            <label htmlFor='custom-request'>
              Please enter any custom details:
            </label>
            <textarea className='m-2' cols='40' type='text' id='custom-reqest' name='custom-request' placeholder='Color, name, phrase, ...'></textarea>
            </div>
          </div>
        </div>
    </div>
    );
  }
}
