import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
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

const Routes = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/michals-music">Michals Music</Link></li>
        <li><Link to="/alex">Alexs Music</Link></li>
        <li><Link to="/chill-music">Chill Music</Link></li>
        <li><Link to="/other-music">Other Music</Link></li>
      </ul>

      <Route path="/:id" component={RoutedApp}/>
      <Route exact path="/" component={UnroutedApp}/>
    </div>
  </Router>
);

export default Routes
