import React, { Component } from 'react';
import Layout from './containers/Layout'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout title="Chat app" />
      </div>
    );
  }
}

export default App;
