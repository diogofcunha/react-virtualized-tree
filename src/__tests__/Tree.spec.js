import React from 'react';
import { shallow } from 'enzyme';
import { List } from 'react-virtualized';

import Tree from '../Tree';
import { Nodes } from '../../testData/sampleTree';
import { getFlattenedTree } from '../selectors/getFlattenedTree';

describe('Tree', () => {
  const SampleRenderer = ({ node }) => (
    <div>
      {`${node.id}`}
    </div>
  );

  const nodes = getFlattenedTree(Nodes);

  const setup = () => shallow(
    <Tree nodes={nodes} onChange={jest.fn()}>
      {
        ({ node, ...rest }) =>
          <SampleRenderer
            node={node}
          >
            { node.name }
          </SampleRenderer>
      }
    </Tree>
  );

  it('should render a Tree with children and the correct props', () => {    
    const wrapper = setup();

    expect(wrapper.render()).toMatchSnapshot();
  });

  it('rowRenderer should render the Node renderer with the correct props', () => {
    const wrapper = setup();

    const { rowRenderer: rowRendererCb } = wrapper.instance();
    const RowRenderer = rowRendererCb(nodes);
    const rowRendererProps = { key: 'a', index: 0, style: {} };
    
    const rowRendererWrapper = shallow(<RowRenderer {...rowRendererProps}/>);

    expect(rowRendererWrapper.first().children().props()).toMatchSnapshot();
  });
});
