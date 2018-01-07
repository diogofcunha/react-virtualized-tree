import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import NavBar from './NavBar';
import { BrowserRouter, NavLink } from 'react-router-dom';
import { Route } from 'react-router';
import ExamplesContainer from './containers/ExamplesContainer';
import Home from './Home';

ReactDOM.render((
  <BrowserRouter>
    <NavBar>
      <Route exact path="/" component={Home} />
      <Route path="/examples" component={ExamplesContainer} />
      <Route path="/docs" component={ExamplesContainer} />
    </NavBar>  
  </BrowserRouter>
), document.getElementById('demo'))
