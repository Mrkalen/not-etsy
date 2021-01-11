import React from 'react';

function NewThumbnails(props) {
  console.log(props.products);
  return (
    props.products.map((product, index) => {
      return (
        <>
          <div className='col-4' key={`product-${props.productId}`}>
            <a>
              <img src={product.pictureUrl} className='img-thumbnail img-fluid'></img>
            </a>
          </div>
        </>
      );
    }

    )
  );
}

export default class Home extends React.Component {
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
      <>
        <div className='carousel-title text-center'>
          <h2>New Items</h2>
        </div>
        <div className='new-items row d-flex align-items-center'>
          <NewThumbnails products={this.state.products} />
        </div>
      </>
    );
  }
}
