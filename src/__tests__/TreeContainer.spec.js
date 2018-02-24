import React from 'react';
import { shallow } from 'enzyme';

import TreeContainer from '../TreeContainer';
import Tree from '../Tree';
import { Nodes } from '../../testData/sampleTree';
import { getFlattenedTree } from '../selectors/getFlattenedTree';
import { UPDATE_TYPE } from '../contants';
import { replaceNodeFromTree, udpateNode } from '../selectors/nodes';

describe('TreeContainer', () => {
  const BulkButton = ({ onChange }) => <button onChange={onChange}>B</button>;

  const setup = (children = () => <span></span>, extraProps = {}, context = {}) => {
    const defaultProps = {
      nodes: Nodes,
      onChange: jest.fn(),
      renderBulkActionButton: ({ onChange }) => <BulkButton onChange={onChange} />
    };

    const props = { ...defaultProps, ...extraProps };

    const wrapper = shallow(
      <TreeContainer {...props}>
        { children }
      </TreeContainer>,
      { context }
    );

    return {
      wrapper,
      props,
      treeWrapper: wrapper.find(Tree)
    }
  };

  it('should render a Tree with children and the correct props', () => {
    const exampleChild = jest.fn();
    const { treeWrapper, wrapper } = setup(exampleChild);
    const { nodes } = treeWrapper.props();

    expect(nodes).toMatchSnapshot();
  });

  it('should render a Tree with children and the correct props after mount', () => {
    const exampleChild = jest.fn();
    const { wrapper } = setup(exampleChild);

    const nodes = Nodes.map(n => ({
      ...n,
      state: {
        ...n.state || {},
        expanded: false
      }
    }));

    wrapper.setProps({ nodes });
  
    const { nodes: treeNodes } = wrapper.find(Tree).props();

    expect(treeNodes).toMatchSnapshot();
  });

  describe('change handle', () => {
    const getSampleNode = () => getFlattenedTree(Nodes)[2]

    it('should call injected prop onChange with the correct params when a node is deleted', () => {
      const { treeWrapper, props } = setup();
      treeWrapper.simulate('change', { node: getSampleNode(), type: UPDATE_TYPE.DELETE });

      expect(
        props.onChange.mock.calls[0]
      ).toMatchSnapshot();
    });

    it('should call injected prop onChange with the correct params when a node is updated', () => {
      const { treeWrapper, props } = setup();

      treeWrapper.simulate('change', {
        node: { ...getSampleNode(), state: { favorite: false, deletable: false } },
        type: UPDATE_TYPE.UPDATE 
      });

      expect(
        props.onChange.mock.calls[0]
      ).toMatchSnapshot();
    });

    it('should call injected prop onChange with the correct params when a node is updated when nodes come from context', () => {
      const { treeWrapper, props } = setup(
        jest.fn(),
        { nodes: Nodes.filter((n, i) => i % 2 === 0) },
        { unfilteredNodes: Nodes }
      );

      treeWrapper.simulate('change', {
        node: { ...getSampleNode(), state: { favorite: false, deletable: false } },
        type: UPDATE_TYPE.UPDATE 
      });

      expect(
        props.onChange.mock.calls[0]
      ).toMatchSnapshot();
    });
  });

  describe('extensions', () => {
    const getSampleNode = () => getFlattenedTree(Nodes)[2];

    const updateAndFlag = (nodes, updatedNode) => replaceNodeFromTree(
      nodes,
      { ...updatedNode, updated: true }
    );

    describe('updateTypeHandlers', () => {
      it('should call injected prop onChange with the correct params for custom handlers', () => {
        const EXPAND_ALL = 3;

        const expandAll = nodes => nodes.map(node => ({
          ...node,
          state: {
            ...node.state,
            expanded: true
          },
          children: node.children ? expandAll(node.children) : []
        }));

        const { treeWrapper, props } = setup(() => <span></span>, { 
          extensions: {
            updateTypeHandlers: {
              [EXPAND_ALL]: expandAll
            }
          }
        });
  
        treeWrapper.simulate('change', { node: getSampleNode(), type: EXPAND_ALL });
  
        expect(
          props.onChange.mock.calls[0]
        ).toMatchSnapshot();
      });

      it('should call injected prop onChange with the correct params for handler overrides', () => {
        const { treeWrapper, props } = setup(() => <span></span>, { 
          extensions: {
            updateTypeHandlers: {
              [UPDATE_TYPE.UPDATE]: updateAndFlag
            }
          }
        });
  
        treeWrapper.simulate('change', { node: getSampleNode(), type: UPDATE_TYPE.UPDATE });
  
        expect(
          props.onChange.mock.calls[0]
        ).toMatchSnapshot();
      });
    });

    it('should allow overrides after first render', () => {
      const { wrapper, props } = setup();

      wrapper.setProps({
        extensions: {
          updateTypeHandlers: {
            [UPDATE_TYPE.UPDATE]: updateAndFlag
          }
        }
      });

      wrapper.find(Tree).simulate('change', { node: getSampleNode(), type: UPDATE_TYPE.UPDATE });

      expect(
        props.onChange.mock.calls[0]
      ).toMatchSnapshot();
    });
  });

  describe('bulkActionButton', () => {
    describe('onChange', () => {
      it('should apply state to all nodes when filtering container is not on', () => {
        const { wrapper, props } = setup();

        wrapper.find(BulkButton).simulate('change', {
          type: UPDATE_TYPE.UPDATE,
          setState: s => s ? ({ ...s, expanded: true }) : s
        });
  
        expect(
          props.onChange.mock.calls[0]
        ).toMatchSnapshot();
      });

      it('should apply state to filtered nodes when container is on', () => {
        const { wrapper, props } = setup(
          jest.fn(),
          { nodes: Nodes.filter((n, i) => i % 2 === 0) },
          { unfilteredNodes: Nodes }
        );
  
        wrapper.find(BulkButton).simulate('change', {
          type: UPDATE_TYPE.UPDATE,
          setState: s => s ? ({ ...s, expanded: true }) : s
        });
  
        expect(
          props.onChange.mock.calls[0]
        ).toMatchSnapshot();
      });
    });
  });
});
