import LargeCollection from './LargeCollection';
import Basic from './Basic';
import Renderers from './Renderers';
import WorldCup from './WorldCup';
import ChangeRenderers from './ChangeRenderers';
import Extensions from './Extensions';
import Filterable from './Filterable';
import NodeMeasure from './NodeMeasure';
import KeyboardNavigation from './KeyboardNavigation';

export default {
  ...Basic,
  ...Renderers,
  ...ChangeRenderers,
  ...WorldCup,
  ...LargeCollection,
  ...Extensions,
  ...Filterable,
  ...NodeMeasure,
  ...KeyboardNavigation,
};
