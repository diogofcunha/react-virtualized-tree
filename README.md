# react-virtualized-tree

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]
[![Gitter](https://img.shields.io/gitter/room/nwjs/nw.js.svg)](https://gitter.im/react-virtualized-tree/Lobby)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

[build-badge]: https://img.shields.io/travis/diogofcunha/react-virtualized-tree/master.png?style=flat-square
[build]: https://travis-ci.org/diogofcunha/react-virtualized-tree
[npm-badge]: https://img.shields.io/npm/v/react-virtualized-tree.png?style=flat-square
[npm]: https://www.npmjs.com/package/react-virtualized-tree
[coveralls-badge]: https://img.shields.io/coveralls/diogofcunha/react-virtualized-tree/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/diogofcunha/react-virtualized-tree

<div align="center" style="margin-bottom: 30px;">
<img src="https://user-images.githubusercontent.com/1521183/37708046-14cf3fb4-2cfd-11e8-9fad-8c0d557397cd.gif" width="650"/>
</div>

## Introduction

**react-virtualized-tree** is a tree view react library built on top of [react-virtualized](https://bvaughn.github.io/react-virtualized/#/components/List)

Its main goal is to display tree like data in a beautiful and fast way. Being a reactive library it uses children functions to achieve maximum extensibility. The core idea behind it is that anyone using it is enable to create a tree as they intent just by rendering their own components or components exported by the tree.

Demo and docs can be found [in here](https://diogofcunha.github.io/react-virtualized-tree/#/examples/basic-tree).

## Installation

You can install via npm or yarn.
`npm i react-virtualized-tree --save`

or

`yarn add react-virtualized-tree`

To get the basic styles for free you need to import react-virtualized styles only once.

```
import 'react-virtualized/styles.css'
import 'react-virtualized-tree/lib/main.css'
```

If you want to use the icons in the default renderers do the same for material icons.

`import 'material-icons/css/material-icons.css'`

## Usage

To use the standalone tree

`import Tree from 'react-virtualized-tree'`

To use the FilteringContainer

`import { FilteringContainer } from 'react-virtualized-tree'`

## Dependencies

Most react-virtualized-tree Dependencies are managed internally, the only required peerDependencies are **react**, **react-dom** and **react-virtualized**.
