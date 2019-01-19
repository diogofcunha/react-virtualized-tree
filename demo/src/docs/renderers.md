# Renderers

A renderer is a component you can use to build your tree stucture. The power of it is that you can either use the renderers shipped with this package or you can create your own! A few examples on how to achieve it can be found at the examples section.

## Injected props

| Name     | Type                                           | Description                                                                           |
| -------- | ---------------------------------------------- | ------------------------------------------------------------------------------------- |
| onChange | ({ node: Node _, type: UPDATE_TYPE _}) => void | to be invoked with the updated node and the update type                               |
| node     | Node \*                                        | The node being rendered for that row, with some additional info                       |
| children | JSX                                            | Anything your render as children of the component when using it                       |
| style    | React.CSSProperties                            | A opt in style property that will auto align your items and apply some default styles |
| measure  | () => void                                     | A function that can be used to let the tree know about your node measurements         |

- Node = {
  id: number
  name: string,
  state: object,
  deepness: number,
  parents: number[]
  }
- UPDATE_TYPE = {
  ADD: 0,
  DELETE: 1,
  UPDATE: 2
  }
