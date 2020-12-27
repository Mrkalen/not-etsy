import React from 'react';

export default class NewItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = { item: {} };
  }

  render() {
    const image = '';
    return (
    <div className="card">
        <img src={image}></img>
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p>
          <a href="#" className="btn btn-primary">Go somewhere</a>
        </div>
    </div>
    );
  }
}
