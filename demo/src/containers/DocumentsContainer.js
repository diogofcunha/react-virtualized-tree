import React, {Component} from 'react';
import {Grid, Menu, Segment, Header} from 'semantic-ui-react';
import {Link, Route} from 'react-router-dom';

import documents from '../docs';
import Doc from '../docs/Doc';
import {getDocumentsPath} from '../toolbelt';
import './ExamplesContainer.css';

export default class ExamplesContainer extends Component {
  render() {
    return (
      <div>
        <Grid>
          <Grid.Column width={4}>
            <Menu fluid vertical tabular>
              {Object.keys(documents).map(path => (
                <Link to={`/docs/${path}`} key={path}>
                  <Menu.Item name={documents[path].name} active={this.props.location.pathname === `/docs/${path}`} />
                </Link>
              ))}
            </Menu>
          </Grid.Column>

          <Grid.Column width={10} heigth={1000}>
            <Route path="/docs/:document" component={Doc} />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
