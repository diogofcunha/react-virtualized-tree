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
  ...createEntry('renderers', 'Renderers', 'Custom Renderer'),
  ...createEntry(
    'customize-renderers',
    'ChangeRenderers',
    'Customize Default Renderers',
    (<div>
      <p>A good example of a possible customization of a default renderer is customizing the tree to display as a folder structure.</p>
      
      <p>By exposing <code>iconsClassNameMap</code> it is possible to pass in the styles applied to the Expandable rendererer, the available style options are:</p>
      {'{ '}<code>
        expanded: string; collapsed: string; lastChild: string;
      </code>{' }'}
    </div>)
  )
}
