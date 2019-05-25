import React from 'react';
import {render, cleanup, fireEvent} from 'react-testing-library';

import Favorite from '../Favorite';
import {KEY_CODES} from '../../eventWrappers';
import {updateNode} from '../../selectors/nodes';

describe('renderers Favorite', () => {
  afterEach(cleanup);

  const setup = (state = {}, extraProps = {}) => {
    const baseProps = {
      onChange: jest.fn(),
      node: {
        id: 1,
        name: 'Node 1',
        state,
        deepness: 0,
        children: [{}],
      },
      measure: jest.fn(),
      index: 1,
    };

    const props = {...baseProps, ...extraProps};

    return {
      ...render(<Favorite {...props} />),
      props,
    };
  };

  describe('when favorite', () => {
    it('should render an icon with the supplied className', () => {
      const {container, props} = setup(
        {favorite: true},
        {
          iconsClassNameMap: {
            favorite: 'fav',
            notFavorite: 'non-fav',
          },
        },
      );

      expect(container.querySelector(`.${props.iconsClassNameMap.favorite}`)).not.toBeNull();
      expect(container.querySelector(`.mi.mi-star`)).toBeNull();
    });

    it('should render an icon with the default className when a map is not provided', () => {
      const {container} = setup({favorite: true});

      expect(container.querySelector(`.mi.mi-star`)).not.toBeNull();
    });

    it('clicking should call onChange with the correct params', () => {
      const {container, props} = setup({favorite: true});

      fireEvent.click(container.querySelector('i'));

      expect(props.onChange).toHaveBeenCalledWith({...updateNode(props.node, {favorite: false}), index: props.index});
    });

    it('pressing enter should call onChange with the correct params', () => {
      const {container, props} = setup({favorite: true});

      fireEvent.keyDown(container.querySelector('i'), {keyCode: KEY_CODES.Enter});

      expect(props.onChange).toHaveBeenCalledWith({...updateNode(props.node, {favorite: false}), index: props.index});
    });
  });

  describe('when not favorite', () => {
    it('should render a with the supplied className', () => {
      const {container, props} = setup(
        {favorite: false},
        {
          iconsClassNameMap: {
            favorite: 'fav',
            notFavorite: 'non-fav',
          },
        },
      );

      expect(container.querySelector(`.${props.iconsClassNameMap.notFavorite}`)).not.toBeNull();
      expect(container.querySelector(`.mi.mi-star-border`)).toBeNull();
    });

    it('should render an icon with the default className when a map is not provided', () => {
      const {container} = setup({favorite: false});

      expect(container.querySelector(`.mi.mi-star-border`)).not.toBeNull();
    });

    it('clicking should call onChange with the correct params', () => {
      const {container, props} = setup({favorite: false});

      fireEvent.click(container.querySelector('i'));

      expect(props.onChange).toHaveBeenCalledWith({...updateNode(props.node, {favorite: true}), index: props.index});
    });

    it('pressing enter should call onChange with the correct params', () => {
      const {container, props} = setup({favorite: false});

      fireEvent.keyDown(container.querySelector('i'), {keyCode: KEY_CODES.Enter});

      expect(props.onChange).toHaveBeenCalledWith({...updateNode(props.node, {favorite: true}), index: props.index});
    });
  });
});
