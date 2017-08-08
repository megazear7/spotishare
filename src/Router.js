import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Sidebar, Segment, Menu, Icon } from 'semantic-ui-react'
import { desktop, tablet, phone } from './breakpoints.js';
import App from './App/App';


// This merely wraps the App component with the station name.
const RoutedApp  = ({ match }) => (
  <App station={match.params.id} />
);

// For clarity I have followed the same convention. This wraps the App with no
// station name.
const UnroutedApp  = ({ }) => (
  <App />
);

class Routes extends Component {
  constructor(props) {
    super(props);

    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.closeSidebar = this.closeSidebar.bind(this);

    desktop(function() {
      console.log("desktop");
    });

    tablet(function() {
      console.log("tablet");
    });

    phone(function() {
      console.log("phone");
    });

    this.state = { visible: false }
  }

  toggleSidebar(e) {
    e.preventDefault();
    this.setState({ visible: !this.state.visible });
  }

  closeSidebar() {
    if (this.state.visible) {
        this.setState({ visible: false });
    }
  }

  render() {
    return (
      <Router>
        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} animation='uncover' width='thin' visible={this.state.visible} icon='labeled' vertical inverted onClick={this.closeSidebar}>
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
          <Sidebar.Pusher onClick={this.closeSidebar} dimmed={this.state.visible}>
            <Segment basic>
              <Link to="#" onClick={this.toggleSidebar} className="icon sidebar-opener">
                {! this.state.visible &&
                  <Icon name='ellipsis vertical' link />}
              </Link>
              <Route path="/:id" component={RoutedApp} />
              <Route exact path="/" component={UnroutedApp} />
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Router>
    )
  }
};

export default Routes
