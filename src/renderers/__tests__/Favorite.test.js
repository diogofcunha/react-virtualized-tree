import React from 'react';
import {shallow} from 'enzyme';

import Favorite from '../Favorite';
import {KEY_CODES} from '../../eventWrappers';
import {updateNode} from '../../selectors/nodes';

describe('renderers Favorite', () => {
  const findFavoriteIcon = wrapper => wrapper.find('i');

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
      iconsClassNameMap: {
        favorite: 'fav',
        notFavorite: 'non-fav',
      },
      measure: jest.fn(),
    };

    const props = {...baseProps, ...extraProps};
    const wrapper = shallow(<Favorite {...props} />);

    return {props, wrapper, favoriteIconWrapper: findFavoriteIcon(wrapper)};
  };

  describe('when favorite', () => {
    const setupFavorite = (extraProps = {}) => setup({favorite: true}, extraProps);

    it('should render a with the supplied className', () => {
      const {favoriteIconWrapper, props} = setupFavorite();

      expect(favoriteIconWrapper.hasClass(props.iconsClassNameMap.favorite)).toBeTruthy();
    });

    it('clicking should call onChange with the correct params', () => {
      const {favoriteIconWrapper, props} = setupFavorite();

      favoriteIconWrapper.simulate('click');

      expect(props.onChange).toHaveBeenCalledWith(updateNode(props.node, {favorite: false}));
    });

    it('pressing enter should call onChange with the correct params', () => {
      const {favoriteIconWrapper, props} = setupFavorite();

      favoriteIconWrapper.simulate('keyDown', {keyCode: KEY_CODES.Enter});

      expect(props.onChange).toHaveBeenCalledWith(updateNode(props.node, {favorite: false}));
    });
  });

  describe('when not favorite', () => {
    const setupNotFavorite = (extraProps = {}) => setup({favorite: false}, extraProps);

    it('should render a with the supplied className', () => {
      const {favoriteIconWrapper, props} = setupNotFavorite();

      expect(favoriteIconWrapper.hasClass(props.iconsClassNameMap.notFavorite)).toBeTruthy();
    });

    it('clicking should call onChange with the correct params', () => {
      const {favoriteIconWrapper, props} = setupNotFavorite();

      favoriteIconWrapper.simulate('click');

      expect(props.onChange).toHaveBeenCalledWith(updateNode(props.node, {favorite: true}));
    });

    it('pressing enter should call onChange with the correct params', () => {
      const {favoriteIconWrapper, props} = setupNotFavorite();

      favoriteIconWrapper.simulate('keyDown', {keyCode: KEY_CODES.Enter});

      expect(props.onChange).toHaveBeenCalledWith(updateNode(props.node, {favorite: true}));
    });
  });
});
