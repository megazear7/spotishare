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
          <div className="user">
              <iframe src="https://embed.spotify.com/follow/1/?uri=spotify:user:megazear7&size=detail&theme=light"
                      width="300" height="56" scrolling="no" frameBorder="0"  allowTransparency="true"
                      style={{border: "none", overflow: "hidden"}}></iframe>
          </div>
        </div>
          <div className="playing">
            <iframe src="https://open.spotify.com/embed?uri=spotify%3Atrack%3A0WTQ3OVvyuD49BfO99Q6y7"
                    width="300" height="80" frameBorder="0" allowTransparency="true"></iframe>
          </div>
      </div>
    );
  }
}

export default App;
