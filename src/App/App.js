import React, { Component } from 'react';
import logo from '../logo.svg';
import './App.css';
import { createCookie, getCookie } from '../utils.js';
import $ from "jquery";

class App extends Component {
  constructor(props) {
    super(props);

    this.updateSearchText = this.updateSearchText.bind(this);
    this.search = this.search.bind(this);

    var initState = {searchText: ''};

    var accessToken = getCookie("spotify_access_token");
    if (typeof accessToken !== "undefined") {
      initState.accessToken = accessToken;
    }

    var userUri = getCookie("spotify_user_uri");
    if (typeof userUri !== "undefined") {
      initState.userUri = userUri;
    }

    this.state = initState;
  }

  componentDidMount() {
    var self = this;
    var accessToken = this.state.accessToken;
    var userUri = this.state.userUri;
    var hash = window.location.hash;

    if (typeof this.state.accessToken === "undefined" && hash.length > 0) {
      var hashArr = window.location.hash.substr(1).split("&").map(function(pair) {
        return { key: pair.split("=")[0], val: pair.split("=")[1] };
      });

      var hashParams = { };
      hashArr.forEach(function(param) {
        hashParams[param.key] = param.val;
      });

      createCookie("spotify_access_token", hashParams["access_token"], hashParams["expires_in"]);
      accessToken = hashParams["access_token"];
      this.setState({accessToken: accessToken});
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
        },
        failure: function() {
          console.log("HELLO");
        }
      });
    }
  }
  
  updateSearchText(event) {
    this.setState({searchText: event.target.value});
  }

  search() {
    var self = this;
    $.ajax({
      url: 'https://api.spotify.com/v1/search',
      data: {
        q: self.state.searchText,
        type: "track",
        limit: 5
      },
      headers: {
        'Authorization': 'Bearer ' + self.state.accessToken
      },
      success: function(response) {
        self.setState({searchTracks: response.tracks.items});
      }
    });
  }

  render() {
    return (
      <div className="app">
        <div className="header">
          <img src={logo} className="app-logo" alt="logo" />
          <h2>Spotishare</h2>
        </div>
        <div className="user">
          {this.state.userUri &&
            <iframe src={"https://embed.spotify.com/follow/1/?uri="+this.state.userUri+"&size=detail&theme=light"}
                    width="250" height="56" scrolling="no" frameBorder="0"  allowTransparency="true" title="user"
                    style={{border: "none", overflow: "hidden"}}></iframe>}
          {! this.state.userUri &&
            <a href="https://accounts.spotify.com/authorize?client_id=4de0ba73539449b4a723fcd91ae34fe0&response_type=token&redirect_uri=http://localhost:3000">
              Login with Spotify
            </a>}
        </div>
        <div className="playing">
          <iframe src="https://open.spotify.com/embed?uri=spotify%3Atrack%3A0WTQ3OVvyuD49BfO99Q6y7"
                  width="300" height="80" frameBorder="0" allowTransparency="true" title="song"></iframe>
          {this.state.userUri &&
            <div>
              <input type="text" onChange={this.updateSearchText}></input>
              <button type="button" onClick={this.search}>Search</button>
            </div>}
          {this.state.searchTracks &&
            this.state.searchTracks.map(function(track) {
              return <p key={track.name}>{track.name}</p>;
            })}
        </div>
        <div className="footer">
          Spotishare version 0.1
        </div>
      </div>
    );
  }
}

export default App;
