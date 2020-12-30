import React from 'react';

function Product(props) {

  const { pictureUrl, productName, price, productId } = props.product;
  return (
    <div className='col-6'>
      <a href={`#details?productId=${productId}`}>
        <div className="card mb-3 shadow-sm text-center">
          <img className='img-no-detail' src={pictureUrl}></img>
          <div className="card-body">
            <h5 className="card-title">{productName}</h5>
            <h5 className='price'>{`$${price}.00`}</h5>
          </div>
        </div>
      </a>
    </div>
  );
}

class NewItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = { products: [] };
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    fetch('/api/products')
      .then(res => res.json())
      .then(products => this.setState({ products }))
      .catch(err => console.error('GET error', err.message));
  }

  render() {
    return (
      this.state.products.map((product, index) => {
        return (
          <Product
            key={product.productId}
            product={product}
          />
        );
      }
      )
    );
  }
}

export default NewItems;
