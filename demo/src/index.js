import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route} from 'react-router-dom';

import NavBar from './NavBar';
import ExamplesContainer from './containers/ExamplesContainer';
import DocumentsContainer from './containers/DocumentsContainer';
import Home from './Home';

import './index.css';
import 'react-virtualized/styles.css';
import 'material-icons/css/material-icons.css';
import '../../src/main.css';

ReactDOM.render(
  <HashRouter>
    <NavBar>
      <Route exact path="/" component={Home} />
      <Route path="/examples" component={ExamplesContainer} />
      <Route path="/docs" component={DocumentsContainer} />
    </NavBar>
  </HashRouter>,
  document.getElementById('demo'),
);
