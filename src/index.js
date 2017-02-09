import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Router, browserHistory, Link} from 'react-router';

import './index.css';

import StateLossDemo from './StateLossDemo';

function Frame({children}) {
  return (
    <div>
      <header>
        <Link className="nav-item" to="/">Index</Link>
        <Link className="nav-item" to="/state-loss">state loss</Link>
      </header>
      {children}
    </div>
  );
}

const router = (
  <Router history={browserHistory}>
    <Route path="/" component={Frame}>
      <Route path="state-loss" component={StateLossDemo}/>
    </Route>
  </Router>
);

ReactDOM.render(
  router,
  document.getElementById('root')
);
