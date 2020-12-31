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
    if (customizationId === 4) {
      return (
        <form>
          <div className='text-left m-3'>
            <label htmlFor='custom-request' className='custom-request'>
              Please enter any custom details:
            </label>
            <textarea className='shadow' cols='37' rows='3' type='text' id='custom-reqest' name='custom-request' placeholder='Color, name, phrase, ...'></textarea>
          </div>
          <div className='row d-flex justify-content-around align-items-center'>
            <div className="input-group col-4">
              <select className="custom-select shadow pr-3 qty" id="inputGroupSelect03" aria-label="Example select with button addon">
                <option default>QTY</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary col-4 p-0 shadow">Add to cart</button>
          </div>
        </form>
      );
    } else if (customizationId === 3) {
      return (
        <form>
          <div className='text-left m-3'>
            <div className="input-group mb-2 w-50 mx-auto">
              <select required className="custom-select team-name shadow" id="inputGroupSelect01">
                <option defaultValue>Team Name</option>
                <option value="1">Ram&apos;s</option>
                <option value="2">Chargers</option>
                <option value="3">Raiders</option>
                <option value="4">49ers</option>
                <option value="5">Seahawks</option>
                <option value="6">Dolphins</option>
              </select>
            </div>
            <label htmlFor='custom-request' className='custom-request'>
              Please enter any custom details:
            </label>
            <textarea className="shadow" cols='37' rows='3' type='text' id='custom-reqest' name='custom-request' placeholder='Color, name, phrase, ...'></textarea>
            <div className='row d-flex justify-content-around align-items-center'>
              <div className="input-group col-4">
                <select className="custom-select shadow pr-3 qty" id="inputGroupSelect03" aria-label="Example select with button addon">
                  <option default>QTY</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
            <button type="submit" className="btn btn-primary col-4 p-0 shadow">Add to cart</button>
            </div>
          </div>
        </form>
      );
    } else if (customizationId === 2) {
      return (
        <form>
          <div className='text-left m-3'>
            <label htmlFor='custom-name-date' className='custom-name-date'>
              Please enter your last name and an est date:
          </label>
            <div className='custom-name-date-input d-flex justify-content-between'>
              <div className="input-group input-group-sm mb-3 pl-0 col-6">
                <input type="text" className="form-control shadow" placeholder='Name' aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
              </div>
              <div className="input-group input-group-sm mb-3 pr-0 col-6 ">
                <input type="text" className="form-control shadow" placeholder='Date' aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
              </div>
            </div>
            <label htmlFor='custom-request' className='custom-request'>
              Please enter any custom details:
            </label>
            <textarea className='shadow' cols='37' rows='3' type='text' id='custom-reqest' name='custom-request' placeholder='Color, name, phrase, ...'></textarea>
          </div>
          <div className='row d-flex justify-content-around align-items-center'>
            <div className="input-group col-4">
              <select className="custom-select shadow pr-3 qty" id="inputGroupSelect03" aria-label="Example select with button addon">
                <option default>QTY</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          <button type="submit" className="btn btn-primary col-4 p-0 shadow">Add to cart</button>
          </div>
        </form>
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
