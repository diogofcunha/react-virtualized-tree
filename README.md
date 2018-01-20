# react-virtualized-tree

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

Describe react-virtualized-tree here.

[build-badge]: https://img.shields.io/travis/diogofcunha/react-virtualized-tree/master.png?style=flat-square
[build]: https://travis-ci.org/diogofcunha/react-virtualized-tree

[npm-badge]: https://img.shields.io/npm/v/react-virtualized-tree.png?style=flat-square
[npm]: https://www.npmjs.com/package/react-virtualized-tree

[coveralls-badge]: https://img.shields.io/coveralls/diogofcunha/react-virtualized-tree/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/diogofcunha/react-virtualized-tree

## Introduction
**react-virtualized-tree** is a react library built on top of [react-virtualized](https://bvaughn.github.io/react-virtualized/#/components/List)

Its main goal is to display tree like data in a beautiful and fast way.
Being a reactive library it uses children functions to achieve maximum extansability.
The core idea behind it is that anyone using it is enable to create a tree as they wich just by rendering their own components or components exported by the tree.

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

## Dependencies
Most react-virtualized-tree Dependencies are managed internally, the only required peerDependencies are **react**, **react-dom** and **react-virtualized**.
