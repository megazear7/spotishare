import React, { Component } from 'react';
import './Station.css';
import { SpotAPI } from '../api.js';

class Station extends Component {
  constructor(props) {
    super(props);

    this.updateSearchText = this.updateSearchText.bind(this);
    this.search = this.search.bind(this);

    this.state = {searchText: '', searchTracks: [ ]};
  }
  
  updateSearchText(event) {
    this.setState({searchText: event.target.value});
  }

  search() {
    var self = this;
    SpotAPI.trackSearch(self.state.searchText, function(response) {
      self.setState({searchTracks: response.tracks.items});
    });
  }

  render() {
    return (
      <div className="station">
        <iframe src="https://open.spotify.com/embed?uri=spotify%3Atrack%3A0WTQ3OVvyuD49BfO99Q6y7"
                width="300" height="80" frameBorder="0" allowTransparency="true" title="song"></iframe>
        <div>
          <input type="text" onChange={this.updateSearchText}></input>
          <button type="button" onClick={this.search}>Search</button>
        </div>
        {this.state.searchTracks.map(function(track) {
          return <p key={track.name}>{track.name}</p>;
        })}
      </div>
    );
  }
}

export default Station;
