import React, { Component } from 'react';
import './Station.css';
import { Input, Divider } from 'semantic-ui-react'
import SpotAPI from '../API/Spotify.js';

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

  search(e) {
    e.preventDefault();
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
        <Divider horizontal>Suggest the next song...</Divider>
        <form onSubmit={this.search}>
          <Input type="text" onChange={this.updateSearchText} placeholder='Search...'></Input>
        </form>
        </div>
        {this.state.searchTracks.map(function(track, index) {
          return <p key={track.name + index}>{track.name}</p>;
        })}
      </div>
    );
  }
}

export default Station;
