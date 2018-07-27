// Type definitions for react-virtualzed-tree
// Definitions by: Diogo Cunha

import * as React from 'react';

interface BasicNode {
  id: number | string;
  name: string;
  state?: { [stateKey: string]: any };
}

export interface Node extends BasicNode {
  children?: BasicNode[];
}

export interface FlattenedNode extends Node {
  deepness: number;
  parents: number[];
}

interface NodeAction {
  type: string;
  node: FlattenedNode
}

type onChange = (updateParams: NodeAction) => void;

export interface Extensions {
  updateTypeHandlers: { [type: number]: onChange }
}

export interface TreeProps {
  extensions: Extensions;
  nodes: Node[];
  onChange: (nodes: Node[]) => void;
  children: (props: RendererProps) => JSX.Element
  nodeMarginLeft?: number;
}

export default class Tree extends React.Component<TreeProps> {}

export interface RendererProps {
  measure: () => void;
  onChange: onChange,
  node: FlattenedNode
}

declare const Deletable: React.SFC<RendererProps>;
declare const Expandable: React.SFC<RendererProps>;
declare const Favorite: React.SFC<RendererProps>

interface Renderers {
  Deletable: React.SFC<RendererProps>;
  Expandable: React.SFC<RendererProps>;
  Favorite: React.SFC<RendererProps>;
}

export const renderers: Renderers;

export interface Group {
  filter: (node: Node) => boolean;
  name: string
}

interface GroupRendererProps {
  onChange: (c: string) => void;
  groups: { [g: string]: Group };
  selectedGroup: string;
}

export interface FilteringContainerProps {
  children: (nodes: Node[]) => JSX.Element;
  debouncer: (func: (...p: any[]) => any, timeout: number) => void;
  groups: { [g: string]: Group };
  selectedGroup: string;
  groupRenderer: React.StatelessComponent<GroupRendererProps> | React.Component<GroupRendererProps>;
  onSelectedGroupChange: (c: string) => void;
}

export class FilteringContainer extends React.Component<FilteringContainerProps> {}

export enum UPDATE_TYPE {
  ADD = 0,
  DELETE = 1,
  UPDATE = 2
}

interface Constants {
  UPDATE_TYPE: UPDATE_TYPE
}

export const constants: Constants

interface NodeRenderOptions {
  hasChildren: boolean;
  isExpanded: boolean;
  isFavorite: boolean;
  isDeletable: boolean;
}

export enum NODE_CHANGE_OPERATIONS {
  CHANGE_NODE = 'CHANGE_NODE',
  DELETE_NODE = 'DELETE_NODE'
}

interface Selectors {
  getNodeRenderOptions: (node: FlattenedNode) => NodeRenderOptions,
  replaceNodeFromTree: (nodes: Node[], updatedNode: FlattenedNode, operation?: NODE_CHANGE_OPERATIONS) => Node[],
  deleteNodeFromTree: (nodes: Node[], nodeToDelete: FlattenedNode) => Node[],
  deleteNode: (node: FlattenedNode[]) => NodeAction,
  addNode: (node: FlattenedNode[]) => NodeAction,
  updateNode: (node: FlattenedNode, state: { [stateKey: string]: any }) => NodeAction,
  getFlattenedTree: (node: node[]) => FlattenedNode,
  getRowIndexFromId: (node: FlattenedNode, id: number) => number,
}

export const selectors: Selectors;
