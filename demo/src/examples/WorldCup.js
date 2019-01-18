import React, {Component} from 'react';
import 'flag-icon-css/css/flag-icon.min.css';

import Tree from '../../../src/TreeContainer';
import Renderers from '../../../src/renderers';
import {createEntry} from '../toolbelt';

const {Expandable} = Renderers;

const groups = {
  A: [0, 1, 2, 3],
  B: [4, 5, 6, 7],
  C: [8, 9, 10, 11],
  D: [12, 13, 14, 15],
  E: [16, 17, 18, 19],
  F: [20, 21, 22, 23],
  G: [24, 25, 26, 27],
  H: [28, 29, 30, 31],
};

const countries = {
  0: {name: 'Russia', flag: 'RU'},
  1: {name: 'Saudi Arabia', flag: 'SA'},
  2: {name: 'Egypt', flag: 'EG'},
  3: {name: 'Uruguay', flag: 'UY'},
  4: {name: 'Portugal', flag: 'PT'},
  5: {name: 'Spain', flag: 'ES'},
  6: {name: 'Morocco', flag: 'MA'},
  7: {name: 'Iran', flag: 'IR'},
  8: {name: 'France', flag: 'FR'},
  9: {name: 'Australia', flag: 'AU'},
  10: {name: 'Peru', flag: 'PE'},
  11: {name: 'Denmark', flag: 'DK'},
  12: {name: 'Argentina', flag: 'AR'},
  13: {name: 'Iceland', flag: 'IS'},
  14: {name: 'Croatia', flag: 'HR'},
  15: {name: 'Nigeria', flag: 'NG'},
  16: {name: 'Brazil', flag: 'BR'},
  17: {name: 'Switzerland', flag: 'CH'},
  18: {name: 'Costa Rica', flag: 'CR'},
  19: {name: 'Serbia', flag: 'RS'},
  20: {name: 'Germany', flag: 'DE'},
  21: {name: 'Mexico', flag: 'MX'},
  22: {name: 'Sweden', flag: 'SE'},
  23: {name: 'South Korea', flag: 'KR'},
  24: {name: 'Belgium', flag: 'BE'},
  25: {name: 'Panama', flag: 'PA'},
  26: {name: 'Tunisia', flag: 'TN'},
  27: {name: 'England', flag: 'GB'},
  28: {name: 'Poland', flag: 'PL'},
  29: {name: 'Senegal', flag: 'SN'},
  30: {name: 'Colombia', flag: 'CO'},
  31: {name: 'Japan', flag: 'JP'},
};

const worldCup = Object.keys(groups).reduce((wc, g) => {
  const groupCountries = groups[g];

  const group = {
    id: Math.random(),
    name: `Group ${g}`,
    state: {
      expanded: true,
    },
    children: groupCountries.map(gc => ({
      id: gc,
      name: countries[gc].name,
    })),
  };

  return [...wc, group];
}, []);

class WorldCupExample extends Component {
  state = {
    nodes: worldCup,
  };

  handleChange = nodes => {
    this.setState({nodes});
  };

  render() {
    return (
      <Tree nodes={this.state.nodes} onChange={this.handleChange}>
        {({style, node, ...rest}) => {
          const country = countries[node.id] && countries[node.id].flag.toLowerCase();

          return (
            <div style={style}>
              <Expandable node={node} {...rest}>
                {country && <span className={`flag-icon flag-icon-${country}`} />}
                <span
                  style={{
                    marginLeft: 7,
                    fontWeight: !country ? 'bold' : 'normal',
                  }}
                >
                  {node.name}
                </span>
              </Expandable>
            </div>
          );
        }}
      </Tree>
    );
  }
}

export default createEntry(
  'world-cup',
  'WorldCup',
  'World cup groups',
  <div>
    <p>
      FIFA world cup is back in 2018, in this special example the tree view is used to display the group stage draw
      results!
    </p>
    <p>Let the best team win.</p>
  </div>,
  WorldCupExample,
);
