import React from 'react';
import BrandForm from '../brand-form';
import CustomForm from '../custom-form';
import NameDateForm from '../name-date-form';

export default class Details extends React.Component {
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
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getProduct();
  }

  // handleChange() {
  //   const inputId = event.target.id;
  //   const newState = Object.assign({}, this.state);
  //   if (inputId === 'custom-select-brand') {
  //     newState.customizations.brand = event.target.value;
  //     this.setState(newState);
  //   } else if (inputId === 'custom-request-brand') {
  //     newState.customizations.custom = event.target.value;
  //     this.setState(newState);
  //   } else if (inputId === 'custom-request-name') {
  //     newState.customizations.name = event.target.value;
  //     this.setState(newState);
  //   } else if (inputId === 'custom-request-date') {
  //     newState.customizations.date = event.target.value;
  //     this.setState(newState);
  //   } else if (inputId === 'custom-request-custom') {
  //     newState.customizations.custom = event.target.value;
  //     this.setState(newState);
  //   } else if (inputId === 'qty-select-custom') {
  //     newState.quantity = event.target.value;
  //     this.setState(newState);
  //   } else if (inputId === 'qty-select-brand') {
  //     newState.quantity = event.target.value;
  //     this.setState(newState);
  //   } else if (inputId === 'qty-select-name-date') {
  //     newState.quantity = event.target.value;
  //     this.setState(newState);
  //   } else if (inputId === 'custom-request-name-date') {
  //     newState.customizations.custom = event.target.value;
  //     this.setState(newState);
  //   }
  // }

  // handleSubmit() {
  //   event.preventDefault();
  //   const addToCart = {
  //     productId: this.state.currentProduct.productId,
  //     customizations: this.state.customizations,
  //     quantity: this.state.quantity
  //   };
  //   const storedCartToken = localStorage.getItem('cart-token-storage');
  //   let clientToken = '';
  //   if (typeof storedCartToken !== 'string') {
  //     clientToken = null;
  //   } else {
  //     clientToken = storedCartToken;
  //   }
  //   fetch('api/cartItems', {
  //     method: 'post',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'x-access-token': clientToken
  //     },
  //     body: JSON.stringify(addToCart)
  //   })
  //     .then(res => res.json())
  //     .then(res => {
  //       const cartTokenStorage = (res.newToken);
  //       if (cartTokenStorage !== undefined) {
  //         localStorage.setItem('cart-token-storage', cartTokenStorage);
  //       }

  //     })
  //     .then(() => {
  //       const newState = {
  //         quantity: '',
  //         cusotmizations: {
  //           name: '',
  //           date: '',
  //           custom: '',
  //           brand: ''
  //         }
  //       };
  //       this.setState(newState);
  //     })
  //     .catch(err => console.error('Error:', err.message));
  // }

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
          <h5>Description:</h5>
          <h5>{description}</h5>
        </div>
        {this.renderForm()}
      </div>

    );
  }
}
