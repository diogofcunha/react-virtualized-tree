import React from 'react';
import { shallow } from 'enzyme';

import BulkAction, { DEFAULT_STATE_KEYS, DEFAULT_CLASS_NAMES } from '../BulkAction';
import { Nodes } from '../../../testData/sampleTree';
import { COLLECTION_MATCH } from '../../contants';

describe('BulkAction renderer', () => {
  const setup = (extraProps = {}) => {
    const props = {
      onChange: jest.fn(),
      nodes: Nodes,
      ...extraProps
    };

    return {
      props,
      wrapper: shallow(<BulkAction {...props} />)
    };
  };

  const setNodesState = (stateSetter, nodes) => nodes.map((n, i) => ({
    ...stateSetter(n, i),
    children: n.children ? setNodesState(stateSetter, n.children) : []
  })); 

  const getTree = (stateKey, collectionMatch) => {
    const stateSetter = (e, i) => ({
      ...e,
      state: {
        ...e.state || {},
        [stateKey]: collectionMatch === COLLECTION_MATCH.Some ? i % 2 === 0 :
          collectionMatch === COLLECTION_MATCH.None ? false :
            true
      }
    });

    return setNodesState(stateSetter, Nodes);
  };

  describe('rendering logic', () => {
    describe('defaults', () => {
      it('should render an icon with the correct className when all match', () => {
        DEFAULT_STATE_KEYS.forEach(k => {
          const { wrapper } = setup({ nodes: getTree(k, COLLECTION_MATCH.All) });

          expect(
            wrapper.findWhere(w => w.hasClass(
              DEFAULT_CLASS_NAMES[k][COLLECTION_MATCH.All])
            ).length
          ).toBe(1);
        });
      });

      it('should render an icon with the correct className when some match', () => {
        DEFAULT_STATE_KEYS.forEach(k => {
          const { wrapper } = setup({ nodes: getTree(k, COLLECTION_MATCH.Some) });

          expect(
            wrapper.findWhere(w => w.hasClass(
              DEFAULT_CLASS_NAMES[k][COLLECTION_MATCH.Some])
            ).length
          ).toBe(1);
        });
      });

      it('should render an icon with the correct className when none match', () => {
        DEFAULT_STATE_KEYS.forEach(k => {
          const { wrapper } = setup({ nodes: getTree(k, COLLECTION_MATCH.None) });

          expect(
            wrapper.findWhere(w => w.hasClass(
              DEFAULT_CLASS_NAMES[k][COLLECTION_MATCH.None])
            ).length
          ).toBe(1);
        });
      });
    });

    describe('overrides', () => {
      it('should use props when injected', () => {
        const iconsClassNameMap = {
          expanded: {
            [COLLECTION_MATCH.All]: 'all',
            [COLLECTION_MATCH.None]: 'none',
            [COLLECTION_MATCH.Some]: 'some'
          }
        };

        const stateKeys = [ 'expanded' ];

        [ COLLECTION_MATCH.None, COLLECTION_MATCH.Some, COLLECTION_MATCH.All ].forEach(s => {
          const { wrapper } = setup({
            iconsClassNameMap,
            stateKeys,
            nodes: getTree('expanded', s)
          });

          expect(
            wrapper.findWhere(w => w.hasClass(
              iconsClassNameMap.expanded[s])
            ).length
          ).toBe(1);
        });
      });
    });
  });
});
