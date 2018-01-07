import React from 'react';

import Basic from "./Basic";
import Renderers from "./Renderers";
import ChangeRenderers from "./ChangeRenderers";
 
export default {
  'basic-tree': {
    name: 'Basic Tree',
    component: Basic 
  },
  renderers: {
    name: 'Custom Renderer',
    component: Renderers
  },
  'customize-renderers': {
    name: 'Customize Default Renderers',
    component: ChangeRenderers,
    description: (<div>
      <p>A good example of a possible customization of a default renderer is customizing the tree to display as a folder structure.</p>
      
      <p>By exposing <code>iconsClassNameMap</code> it is possible to pass in the styles applied to the Expandable rendererer, the available style options are:</p>
      {'{ '}<code>
        expanded: string; collapsed: string; lastChild: string;
      </code>{' }'}
    </div>)
  }
}
