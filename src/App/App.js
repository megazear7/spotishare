import React, { Component } from 'react';
import logo from '../logo.svg';
import './App.css';
import { createCookie, getCookie, findGetParameter } from '../utils.js';
import $ from "jquery";

class App extends Component {
  constructor(props) {
    super(props);

    this.updateSearchText = this.updateSearchText.bind(this);
    this.search = this.search.bind(this);

    var initState = {searchText: ''};

    var refreshToken = findGetParameter("refresh_token") || getCookie("spotify_refresh_token");
    if (typeof refreshToken !== "undefined") {
      initState.refreshToken = refreshToken;
    }

    var accessToken = findGetParameter("access_token") || getCookie("spotify_access_token");
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
    var refreshToken = this.state.refreshToken;
    var accessToken = this.state.accessToken;
    var userUri = this.state.userUri;

    if (refreshToken) {
      $.get({
        url: 'http://localhost:8888/refresh_token',
        data: {
          refresh_token: refreshToken
        },
        success: function(response) {
          console.log("Token refreshed");
        }
      });
    }
    
    if (accessToken && ! userUri) {
      $.ajax({
        url: 'https://api.spotify.com/v1/me',
        headers: {
          'Authorization': 'Bearer ' + accessToken
        },
        success: function(response) {
          console.log(response);
          self.setState({spotify_user_uri: response.uri});
          createCookie("spotify_user_uri", response.uri);
        },
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
    var thisUrl = window.location.protocol + "//" + window.location.host;

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
            <a href={"http://localhost:8888/login"}>
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
