import React from 'react';
import Header from './header';
import NewItems from './pages/new-items';

export default class App extends React.Component {
  render() {
    return (
      <>
      <Header />
      <NewItems />
      </>
    );
  }
}
