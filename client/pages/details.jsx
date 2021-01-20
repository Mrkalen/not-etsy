import React from 'react';
import BrandForm from '../brand-form';
import CustomForm from '../custom-form';
import NameDateForm from '../name-date-form';

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
    if (customizationId === 4) {
      return (
      <CustomForm product={this.state.currentProduct} />
      );
    } else if (customizationId === 3) {
      return (
        <BrandForm product={this.state.currentProduct} />
      );
    } else if (customizationId === 2) {
      return (
        <NameDateForm product={this.state.currentProduct} />
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
          <h5 className='heading'>Description:</h5>
          <h6>{description}</h6>
        </div>
        {this.renderForm()}
      </div>

    );
  }
}
