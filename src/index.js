import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
import Router from './Router';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route, Link } from 'react-router-dom';

ReactDOM.render(<Router />, document.getElementById('root'));
registerServiceWorker();
