import React, {Component} from 'react';
import {Grid, Menu, Segment, Header} from 'semantic-ui-react';
import {Route} from 'react-router';
import examples from '../examples';
import {Link} from 'react-router-dom';
import {getExamplePath} from '../toolbelt';
import './ExamplesContainer.css';

export default class ExamplesContainer extends Component {
  render() {
    return (
      <div>
        <Grid>
          <Grid.Column width={4}>
            <Menu fluid vertical tabular>
              {Object.keys(examples).map(path => (
                <Link to={`/examples/${path}`} key={path}>
                  <Menu.Item name={examples[path].name} active={this.props.location.pathname === `/examples/${path}`} />
                </Link>
              ))}
            </Menu>
          </Grid.Column>

          <Grid.Column width={10} heigth={1000}>
            <Route
              path="/examples/:example"
              render={p => {
                const selectedExample = examples[p.match.params.example];
                const {component: Component, name, description, fileName} = selectedExample;

                return (
                  <div>
                    <span className="jump-to-source">
                      <a href={getExamplePath(fileName)}>Jump to source</a>
                    </span>
                    <Header as="h1">{name}</Header>
                    {description && <Segment>{description}</Segment>}
                    <div style={{height: 500}}>
                      <Component {...p} />
                    </div>
                  </div>
                );
              }}
            />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
