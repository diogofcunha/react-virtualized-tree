import React from 'react';
import LargeCollection from './LargeCollection';
import Basic from './Basic';
import Renderers from './Renderers';
import WorldCup from './WorldCup';
import ChangeRenderers from './ChangeRenderers';
 
export default {
  ...Basic,
  ...Renderers,
  ...ChangeRenderers,
  ...WorldCup,
  ...LargeCollection
}
