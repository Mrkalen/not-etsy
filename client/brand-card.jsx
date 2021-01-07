import React from 'react';

export default class BrandCard extends React.Component {

  render() {
    const { pictureUrl, productName, customizations, price, quantity, description } = this.props.product;
    return (
      <>
        <div className='col-4'>
          <img src={pictureUrl} className='card-img' alt={description}></img>
        </div>
        <div className='card-body col-2 align-center'>
            <div className="input-group mb-2 w-50 mx-auto">
              <select onChange={this.handleChange} required value={customizations.brand} name='brand' className="custom-select team-name shadow" id="custom-select-brand">
                <option defaultValue value=''>Team Name</option>
                <option value="rams">Ram&apos;s</option>
                <option value="chargers">Chargers</option>
                <option value="raiders">Raiders</option>
                <option value="49ers">49ers</option>
                <option value="seahawks">Seahawks</option>
                <option value="dolphins">Dolphins</option>
              </select>
            </div>
          <div className="input-group">
            <select onChange={this.handleChange} required value={quantity} name='quantity' className="custom-select shadow pr-3 qty" id="qty-select-custom" aria-label="Example select with button addon">
              <option defaultValue value=''>QTY</option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
            </select>
          </div>
        </div>
        <div className='col-6 price text-center'>
          <p>{productName}</p>
          <p>{`QTY: ${quantity} x $${price}.00`}</p>
        </div>
      </>
    );
  }
}
