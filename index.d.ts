// Type definitions for react-virtualized-tree
// Definitions by: Diogo Cunha

import * as React from 'react';

type NodeId = number | string;

interface BasicNode {
  id: NodeId;
  name: string;
  state?: {[stateKey: string]: any};
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
  node: FlattenedNode;
}

type onChange = (nodes: Node[], node: Node) => Node[];

export interface Extensions {
  updateTypeHandlers: {[type: number]: onChange};
}

export interface TreeProps {
  extensions?: Extensions;
  nodes: Node[];
  onChange: (nodes: Node[]) => void;
  children: <T = any>(props: RendererProps<T>) => JSX.Element;
  nodeMarginLeft?: number;
  width?: number;
  scrollToId?: NodeId;
  scrollToAlignment?: string;
}

export default class Tree extends React.Component<TreeProps> {}

export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

export interface RendererProps<T> {
  measure: () => void;
  index: number;
  onChange: (updateParams: NodeAction) => void;
  node: FlattenedNode;
  iconsClassNameMap?: T;
  style: React.CSSProperties;
  children?: React.ReactNode;
}

export type InjectedRendererProps<T> = Omit<RendererProps<T>, 'iconsClassNameMap'>;
export type CustomRendererProps<T> = Omit<RendererProps<T>, 'style'>;

type DeletableRenderProps = CustomRendererProps<{delete?: string}>;

type ExpandableRenderProps = CustomRendererProps<{
  expanded?: string;
  collapsed?: string;
  lastChild?: string;
}>;

type FavoriteRenderProps = CustomRendererProps<{
  favorite?: string;
  notFavorite?: string;
}>;

declare const Deletable: React.SFC<DeletableRenderProps>;
declare const Expandable: React.SFC<ExpandableRenderProps>;
declare const Favorite: React.SFC<FavoriteRenderProps>;

interface Renderers {
  Deletable: React.SFC<DeletableRenderProps>;
  Expandable: React.SFC<ExpandableRenderProps>;
  Favorite: React.SFC<FavoriteRenderProps>;
}

export const renderers: Renderers;

export interface Group {
  filter: (node: Node) => boolean;
  name: string;
}

interface GroupRendererProps {
  onChange: (c: string) => void;
  groups: {[g: string]: Group};
  selectedGroup: string;
}

export interface FilteringContainerProps {
  nodes: Node[];
  children: (params: {nodes: Node[]; nodeParentMappings: {[id: NodeId]: NodeId[]}}) => JSX.Element;
  debouncer?: (func: (...p: any[]) => any, timeout: number) => void;
  groups?: {[g: string]: Group};
  selectedGroup?: string;
  groupRenderer?: React.StatelessComponent<GroupRendererProps> | React.Component<GroupRendererProps>;
  onSelectedGroupChange?: (c: string) => void;
  indexSearch: (searchTerm: string, nodes: FlattenedNode[]) => (node: FlattenedNode) => boolean;
}

export class FilteringContainer extends React.Component<FilteringContainerProps> {}

export enum UPDATE_TYPE {
  ADD = 0,
  DELETE = 1,
  UPDATE = 2,
}

interface Constants {
  UPDATE_TYPE: UPDATE_TYPE;
}

export const constants: Constants;

interface NodeRenderOptions {
  hasChildren: boolean;
  isExpanded: boolean;
  isFavorite: boolean;
  isDeletable: boolean;
}

export enum NODE_CHANGE_OPERATIONS {
  CHANGE_NODE = 'CHANGE_NODE',
  DELETE_NODE = 'DELETE_NODE',
}

interface Selectors {
  getNodeRenderOptions: (node: FlattenedNode) => NodeRenderOptions;
  replaceNodeFromTree: (nodes: Node[], updatedNode: FlattenedNode, operation?: NODE_CHANGE_OPERATIONS) => Node[];
  deleteNodeFromTree: (nodes: Node[], nodeToDelete: FlattenedNode) => Node[];
  deleteNode: (node: FlattenedNode[]) => NodeAction;
  addNode: (node: FlattenedNode[]) => NodeAction;
  updateNode: (node: FlattenedNode, state: {[stateKey: string]: any}) => NodeAction;
}

interface State {
  flattenedTree: Array<number | string>[];
  tree: Node[];
}

export interface TreeState {
  getNodeAt: (state: State, index: number) => Node;
  getTree: (state: State) => Node[];
  createFromTree: (tree: Node[]) => State;
  getNumberOfVisibleDescendants: (state: State, index: number) => number;
  getNodeDeepness: (state: State, index: number) => number;
}

export interface TreeStateModifiers {
  editNodeAt: (state: State, index: number, updateNode: ((oldNode: Node) => Node) | Node) => State;
  deleteNodeAt: (state: State, index: number) => State;
}

export const selectors: Selectors;
