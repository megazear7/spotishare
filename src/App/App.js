import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'
import logo from '../logo.svg';
import { getCookie, apiUrl } from '../utils.js';
import SpotAPI from '../SpotAPI.js';
import './App.css';
import Station from '../Station/Station.js';
import Home from '../Home/Home.js';

class App extends Component {
  constructor(props) {
    super(props);

    var initState = {searchText: ''};

    var userUri = getCookie("spotify_user_uri");
    if (typeof userUri !== "undefined") {
      initState.userUri = userUri;
    }

    this.state = initState;
  }

  componentDidMount() {
    var self = this;
    var userUri = this.state.userUri;

    SpotAPI.refreshToken();
    
    if (! userUri) {
      SpotAPI.login(function(response) {
        self.setState({userUri: response.uri});
      });
    }
  }
  
  updateSearchText(event) {
    this.setState({searchText: event.target.value});
  }

  render() {
    return (
      <div className="app">
        <div className="header">
          <img src={logo} className="app-logo" alt="logo" />
          <h2>Spotishare: {this.props.station}</h2>
        </div>
        <div className="user">
          {this.state.userUri &&
            <iframe src={"https://embed.spotify.com/follow/1/?uri="+this.state.userUri+"&size=detail&theme=light"}
                    width="250" height="56" scrolling="no" frameBorder="0"  allowTransparency="true" title="user"
                    style={{border: "none", overflow: "hidden"}}></iframe>}
          {! this.state.userUri &&
            <a href={apiUrl("/login")}>
              Login with Spotify
            </a>}
        </div>
        <div className="playing">
          <Button>Click Me</Button>
          {this.props.station && 
            <Station />}
          {! this.props.station && 
            <Home />}
        </div>
        <div className="footer">
          Spotishare version 0.1
        </div>
      </div>
    );
  }
}

export default App;
