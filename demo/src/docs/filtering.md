# FilteringContainer
FilteringComponent is a component that can be used to wrap the Tree in order to get filtering and group functionality for free.

To use this component you should know a little bit about [using functions as children](https://codedaily.io/tutorials/6/Using-Functions-as-Children-and-Render-Props-in-React-Components).

## Props

| Name                  | Type         | Description |
| --------------------- | -------------| ----------- |
| nodes                 | Node[]       | List of original nodes |
| children              | ({ nodes: Node[] }) => JSX | A renderer for the tree|
| debouncer?            | (setFilter: Func, timeout) => void| Debounce search results, default to lodash debouncer with 300ms timeout|
| groups?               | { [groupKey: string]: *Group } | Groups with selectors to quickly filter results |
| selectedGroup?        | string       | Selected group key |
| groupRenderer?        | Component<*RendererProps>    | Custom group renderer |
| onSelectedGroupChange?| (groupKey: string) => void | A handler invoked when group selection changes |


## Props Injected in children function
| Name          | Type         | Description |
| ------------- | -------------| ----------- |
| nodes         | Node[]       | List of nodes after filters being applied |

## Created context
| Name           | Type    | Description |
| ---------------| --------| ----------- |
| unfilteredNodes| Node[]  | List of nodes originally injected in the component |

* Node = {
  id: number
  name: string,
  state: object
}

* Group = {
  name: string,
  filter: (node: Node) => boolean
}

* RendererProps = {
  onChange: (groupKey: string) => void,
  groups: { [groupKey: string]: *Group },
  selectedGroup: string
}
