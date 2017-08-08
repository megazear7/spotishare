import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'
import App from './App/App';


// This merely wraps the App component with the station name.
const RoutedApp  = ({ match }) => (
  <App station={match.params.id} />
);

// For clarity I have followed the same convention. This wraps the App with no
// station name.
const UnroutedApp  = ( ) => (
  <App />
);

class Routes extends Component {
  constructor(props) {
    super(props);

    this.toggleVisibility = this.toggleVisibility.bind(this);

    this.state = { visible: false }
  }

  toggleVisibility(e) {
    e.preventDefault();
    this.setState({ visible: !this.state.visible });
  }

  render() {
    return (
      <Router>
        <div>
            <Sidebar.Pushable as={Segment}>
              <Sidebar as={Menu} animation='overlay' width='thin' visible={this.state.visible} icon='labeled' vertical inverted>
                <Menu.Item name='close'>
                  <Link to="#" onClick={this.toggleVisibility} className="icon">
                    <Icon name='remove' link />
                  </Link>
                </Menu.Item>
                <Menu.Item name='home'>
                  <Link to="/" className="icon">
                    <Icon name='home' link />
                  </Link>
                </Menu.Item>
                <Menu.Item name='gamepad'>
                  <Link to="/michals-music">Michals Music</Link>
                </Menu.Item>
                <Menu.Item name='camera'>
                  <Link to="/alex">Alexs Music</Link>
                </Menu.Item>
              </Sidebar>
              <Sidebar.Pusher>
                <Segment basic>
                  <Link to="#" onClick={this.toggleVisibility} className="icon">
                    <Icon name='ellipsis vertical' link />
                  </Link>
                  <Route path="/:id" component={RoutedApp}/>
                  <Route exact path="/" component={UnroutedApp}/>
                </Segment>
              </Sidebar.Pusher>
            </Sidebar.Pushable>
        </div>
      </Router>
    )
  }
};

export default Routes
