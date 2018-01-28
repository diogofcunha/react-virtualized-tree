# Extensions
The entry component supports extensions to the components original functionality. The currently available extensions are:
- updateTypeHandlers

## updateTypeHandlers
### () => { [updateType: number]: (nodes: Node[], updatedNode: Node) => Nodes[]
Allows you to override or create new handlers, can be of use in case you either want to extend currently supported functionality (for example if you wish to flag updated nodes with a boolean property to help you filter out data before sending to the server side) or to create your own update types and handlers to support bussiness requirements.

The existing update types are exported by the module inside a named export (import { constants } from 'react-virtualized-tree')
