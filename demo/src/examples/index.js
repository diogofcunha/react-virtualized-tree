import React from 'react';

const createEntry = (key, fileName, name, description) => ({
  [key]: {
    name,
    fileName,
    description,
    component: require(`./${fileName}`).default
  }
})
 
export default {
  ...createEntry(
    'basic-tree',
    'Basic',
    'Basic Tree',
    (
      <div>
        <p>A tree that enables favorite toogle, expansion and deletion, this example only makes use of the default renderers</p>
      </div>
    )
  ),
  ...createEntry(
    'renderers',
    'Renderers',
    'Create a custom renderer',
    (
      <div>
        <p>A tree that makes use of a custom renderer</p>
      </div>
    )
  ),
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
