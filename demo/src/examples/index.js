import React from 'react';

import Renderers from './Renderers';
import ChangeRenderers from './ChangeRenderers';

const createEntry = (key, fileName, name, description) => ({
  [key]: {
    name,
    fileName,
    description,
    component: require(`./${fileName}`).default
  }
})
 
export default {
  ...createEntry('basic-tree', 'Basic', 'Basic Tree'),
  ...createEntry('renderers', 'Renderers', 'Create a custom renderer'),
  ...createEntry(
    'customize-renderers',
    'ChangeRenderers',
    'Customize default renderers',
    (<div>
      <p>A good example of a possible customization of a default renderer is customizing the tree to display as a folder structure.</p>
      
      <p>By exposing <code>iconsClassNameMap</code> it is possible to pass in the styles applied to the Expandable rendererer, the available style options are:</p>
      {'{ '}<code>
        expanded: string; collapsed: string; lastChild: string;
      </code>{' }'}
    </div>)
  ),
  ...createEntry(
    'world-cup',
    'WorldCup',
    'World cup groups',
    (<div>
      <p>FIFA world cup is back in 2018, in this special example the tree view is used to display the group stage draw results!</p>
      <p>Let the best team win.</p>
    </div>)
  )
}
