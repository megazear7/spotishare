import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import App from './App/App';

class Home extends React.Component {
  render() {
    return (
      <div>Home Page. This is where users will create their own music</div>
    );
  }
};

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

      <Route path="/:id" component={Station}/>
      <Route path="/" component={Home}/>
    </div>
  </Router>
)

const Station = ({ match }) => (
  <App station={match.params.id} />
)

export default Routes
