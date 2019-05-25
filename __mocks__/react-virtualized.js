import React from 'react';

export class CellMeasurerCache {}

export const AutoSizer = ({children}) => <React.Fragment>{children({width: 1000, height: 1000})}</React.Fragment>;
// const mockInifiteLoader = ({children}) => (
//   <React.Fragment>{children({registerChild: jest.fn(), onRowsRendered: jest.fn()})}</React.Fragment>
// );

export const CellMeasurer = ({children}) => <React.Fragment>{children({measure: jest.fn()})}</React.Fragment>;

export const List = p =>
  Array.from({length: p.rowCount}).map((_, i) =>
    p.rowRenderer({
      key: String(i),
      columnIndex: 0,
      index: i,
      rowIndex: i,
      isScrolling: false,
      isVisible: true,
      parent: {},
      style: {},
    }),
  );
