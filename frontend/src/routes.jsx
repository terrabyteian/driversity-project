import React from 'react';
import ReactDOM from 'react-dom';

import App from './app.jsx';
import {Router, Route, Link, IndexLink, IndexRoute} from 'react-router';

import FilterApp from './components/FilterApp/FilterApp'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={FilterApp} />
  </Route>
);
