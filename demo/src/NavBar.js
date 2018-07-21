import React, {Component} from 'react';
import {Sidebar, Segment, Menu, Image, Grid} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

import {getRepoPath} from './toolbelt';
import './NavBar.css';

class NavBar extends Component {
  render() {
    return (
      <div className="content">
        <Grid>
          <Grid.Column width={13}>
            <div className="header">
              <Grid>
                <Grid.Column width={3}>
                  <img src="http://cdn.onlinewebfonts.com/svg/img_525932.png" width={150} />
                </Grid.Column>
                <Grid.Column width={13} className="header-text">
                  react-virtualized-tree
                </Grid.Column>
              </Grid>
            </div>
            {this.props.children}
          </Grid.Column>
          <Grid.Column width={3}>
            <Sidebar
              as={Menu}
              animation="overlay"
              width="thin"
              direction="right"
              visible
              icon="labeled"
              vertical
              inverted
            >
              <Menu.Item name="home">
                <Link to="/">Setup</Link>
              </Menu.Item>
              <Menu.Item name="docs">
                <Link to="/docs/renderers">Documentation</Link>
              </Menu.Item>
              <Menu.Item name="examples">
                <Link to="/examples/basic-tree">Examples</Link>
              </Menu.Item>
              <Menu.Item name="github">
                <a href={getRepoPath()}>GitHub</a>
              </Menu.Item>
            </Sidebar>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default NavBar;
