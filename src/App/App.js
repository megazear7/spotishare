import React, { Component } from 'react';
import logo from '../logo.svg';
import './App.css';
import { createCookie, getCookie } from '../utils.js';
import $ from "jquery";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { };
  }

  componentDidMount() {
    var self = this;
    var accessToken = getCookie("access_token");
    var userUri = getCookie("spotify_user_uri");
    var hash = window.location.hash;

    if (typeof accessToken === "undefined" && hash.length > 0) {
      var hashArr = window.location.hash.substr(1).split("&").map(function(pair) {
        return { key: pair.split("=")[0], val: pair.split("=")[1] };
      });

      var hashParams = { };
      hashArr.forEach(function(param) {
        hashParams[param.key] = param.val;
      });

      createCookie("spotify_access_token", hashParams["access_token"], hashParams["expires_in"]);
      accessToken = hashParams["access_token"];
      window.location.hash = "";
    }

    if (typeof userUri !== "undefined") {
      self.setState({userUri: userUri});
    } else if (typeof accessToken !== "undefined") {
      $.ajax({
        url: 'https://api.spotify.com/v1/me',
        headers: {
          'Authorization': 'Bearer ' + accessToken
        },
        success: function(response) {
          userUri = response.uri
          self.setState({userUri: userUri});
          createCookie("spotify_user_uri", userUri, "3600");
        }
      });
    }

  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Spotishare</h2>
          <div className="user">
            {this.state.userUri &&
              <iframe src={"https://embed.spotify.com/follow/1/?uri="+this.state.userUri+"&size=detail&theme=light"}
                      width="300" height="56" scrolling="no" frameBorder="0"  allowTransparency="true"
                      style={{border: "none", overflow: "hidden"}}></iframe>}
            {! this.state.userUri &&
              <a href="https://accounts.spotify.com/authorize?client_id=4de0ba73539449b4a723fcd91ae34fe0&response_type=token&redirect_uri=http://localhost:3000">
                Login with Spotify
              </a>}
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
