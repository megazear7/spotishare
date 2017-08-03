import React, { Component } from 'react';
import logo from '../logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Spotishare</h2>
        </div>
        <iframe src="https://open.spotify.com/embed?uri=spotify%3Atrack%3A33Q6ldVXuJyQmqs8BmAa0k"
                width="300" height="80" frameborder="0" allowtransparency="true"></iframe>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload. TEST
        </p>
      </div>
    );
  }
}

export default App;
