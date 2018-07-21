import React from 'react';
import {shallow} from 'enzyme';
import {List, CellMeasurer} from 'react-virtualized';

import Tree from '../Tree';
import {Nodes} from '../../testData/sampleTree';
import {getFlattenedTree} from '../selectors/getFlattenedTree';

describe('Tree', () => {
  const SampleRenderer = ({node}) => <div>{`${node.id}`}</div>;

  const nodes = getFlattenedTree(Nodes);

  const setup = () =>
    shallow(
      <Tree
        nodes={nodes}
        onChange={jest.fn()}
        NodeRenderer={({node, ...rest}) => <SampleRenderer node={node}>{node.name}</SampleRenderer>}
      />,
    );

  it('should render a Tree with children and the correct props', () => {
    const wrapper = setup();

    expect(wrapper.render()).toMatchSnapshot();
  });

  it('rowRenderer should render the Node renderer with the correct props', () => {
    const wrapper = setup();

    const {rowRenderer: RowRenderer} = wrapper.instance();
    const rowRendererProps = {
      index: 0,
      node: nodes[0],
      measure: jest.fn(),
      NodeRenderer: SampleRenderer,
    };

    const rowRendererWrapper = shallow(<RowRenderer {...rowRendererProps} />);

    expect(rowRendererWrapper.find(SampleRenderer).props()).toMatchSnapshot();
  });

  it('measureRowRenderer should render a CellMeasurer', () => {
    const wrapper = setup();

    const {measureRowRenderer} = wrapper.instance();
    const MeasureRowRenderer = measureRowRenderer(nodes);

    const rowRendererProps = {
      index: 0,
      parent: {},
    };

    const measureRowRendererWrapper = shallow(<MeasureRowRenderer {...rowRendererProps} />);

    expect(measureRowRendererWrapper.find(CellMeasurer).props()).toMatchSnapshot();
  });
});
