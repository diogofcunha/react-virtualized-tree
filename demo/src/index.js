import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import NavBar from './navBar';
import { BrowserRouter, NavLink } from 'react-router-dom';
import { Route } from 'react-router';
import ExamplesContainer from './containers/ExamplesContainer';

ReactDOM.render((
  <BrowserRouter>
    <NavBar>
      <Route exact path="/" component={ExamplesContainer} />
      <Route path="/examples" component={ExamplesContainer} />
      <Route path="/docs" component={ExamplesContainer} />
    </NavBar>  
  </BrowserRouter>
), document.getElementById('demo'))
