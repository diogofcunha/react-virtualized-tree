import React from 'react';
import LargeCollection from './LargeCollection';
import Basic from './Basic';
import Renderers from './Renderers';
import WorldCup from './WorldCup';
import ChangeRenderers from './ChangeRenderers';
import Extensions from './Extensions';
import Filterable from './Filterable';
import NodeMeasure from './NodeMeasure';
import InfiniteLoader from './InfiniteLoader';

export default {
  ...Basic,
  ...Renderers,
  ...ChangeRenderers,
  ...WorldCup,
  ...LargeCollection,
  ...Extensions,
  ...Filterable,
  ...NodeMeasure,
  ...InfiniteLoader,
};
