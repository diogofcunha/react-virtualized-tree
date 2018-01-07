import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, NavLink } from 'react-router-dom';
import { Route } from 'react-router';

import NavBar from './NavBar';
import ExamplesContainer from './containers/ExamplesContainer';
import DocumentsContainer from './containers/DocumentsContainer';
import Home from './Home';
import './index.css';

ReactDOM.render((
  <BrowserRouter>
    <NavBar>
      <Route exact path="/react-virtualized-tree" component={Home} />
      <Route path="/react-virtualized-tree/examples" component={ExamplesContainer} />
      <Route path="/react-virtualized-tree/docs" component={DocumentsContainer} />
    </NavBar>  
  </BrowserRouter>
), document.getElementById('demo'))
