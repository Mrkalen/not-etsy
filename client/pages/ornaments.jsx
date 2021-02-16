import React from 'react';

function Product(props) {

  const { pictureUrl, productName, price, productId } = props.product;
  return (
    <div className='col-6 col-md-4 col-xl-2 col-lg-3'>
      <a href={`#details?productId=${productId}`}>
        <div className="item-cards mb-3 shadow-sm text-center" style={{ height: 15 + 'rem' }}>
          <img className='card-img-top img-card' src={pictureUrl}></img>
          <div className="card-body p-2">
            <h6 className="card-title">{productName}</h6>
            <h6 className='price'>{`$${price}.00`}</h6>
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
    const ornaments = this.state.products.filter(product => {
      return (product.categoryId === 1);
    });
    return (
      <>
        <div className='category-title text-center w-100 mb-2'>
          <h2>Ornaments</h2>
        </div>
        <div className='container'>
          <div className='row m-auto mx-0'>
            {ornaments.map(product => {
              return (
                <Product
                  key={product.productId}
                  product={product}
                />
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

export default NewItems;
