// Type definitions for react-virtualzed-tree
// Definitions by: Diogo Cunha

import * as ReactVirtualizedTree from 'react-virtualized-tree';

import * as React from 'React';

declare module 'ReactVirtualizedTree' {
    interface BasicNode {
      id: number | string;
      name: string;
      state?: { [s: key]: any };
    }

    export interface Node extends BasicNode {
      children?: BasicNode[];
    }

    export interface FlattenedNode extends BasicNode {
      deepness: number;
      parents: number[];
    }

    type onChange = (updateParams: { node: FlattenedNode, type: string }) => void;

    export interface Extensions {
      updateTypeHandlers: { [type: number]: onChange }
    }

    export interface TreeProps {
      extensions: Extensions;
      nodes: Node[];
      onChange: (nodes: Node[]) => void;
      children: (props: RendererProps) => JSX.Element
    }

    export default class Tree extends React.Component<TreeProps> {}

    export interface RendererProps {
      onChange: onChange,
      node: FlattenedNode
    }

    const Deletable: React.SFC<RendererProps>;
    const Expandable: React.SFC<RendererProps>;
    const Favorite: React.SFC<RendererProps>

    export const renderers = {
      Deletable,
      Expandable,
      Favorite
    }

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

    export const constants = {
      UPDATE_TYPE
    }
}