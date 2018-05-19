#### Caption
- :lollipop: - Refactor/improvment
- :rocket: - Feature
- :bug: - Bug fix

### 2.0.1
- :lollipop: Nwb update to the latest release ([diogofcunha](https://github.com/diogofcunha) - [#41](https://github.com/diogofcunha/react-virtualized-tree/pull/41))

- :lollipop: React 16.3 update ([diogofcunha](https://github.com/diogofcunha) - [#40](https://github.com/diogofcunha/react-virtualized-tree/pull/40))

- :lollipop:/:rocket: Optimize bundle ([diogofcunha](https://github.com/diogofcunha) - [#38](https://github.com/diogofcunha/react-virtualized-tree/pull/38))
  > react-dom, react-virtualized and full lodash were included in the build. umd module size 322.58 KB (:worried:) to 28.05 KB (:relaxed:)

- :lollipop: Add a basic screenshot. Update the example link. ([justinlawrence](https://github.com/justinlawrence) - [#32](https://github.com/diogofcunha/react-virtualized-tree/pull/32))

- :lollipop: Store filter mappings to improve future update performance. ([diogofcunha](https://github.com/diogofcunha) - [#28](https://github.com/diogofcunha/react-virtualized-tree/pull/28))

- :lollipop: Internal renames. ([diogofcunha](https://github.com/diogofcunha) - [#27](https://github.com/diogofcunha/react-virtualized-tree/pull/27))

- :rocket: Exposing Left Margin as a User Modifiable Property. ([blakfeld](https://github.com/blakfeld) - [#25](https://github.com/diogofcunha/react-virtualized-tree/pull/25))
  > Exposing tree node left margin as a prop

- :bug: Fixing typo. ([blakfeld](https://github.com/blakfeld) - [#24](https://github.com/diogofcunha/react-virtualized-tree/pull/24))
  > Fixed typo udpateNode


- :rocket: Dynamic node height. ([diogofcunha](https://github.com/diogofcunha) - [#22](https://github.com/diogofcunha/react-virtualized-tree/pull/22))
  > Using CellMeasurer to have dynamic row heigths, example added at https://diogofcunha.github.io/react-virtualized-tree/#/examples/node-measure

- :lollipop:/:rocket: Improve node replace algorithm. ([diogofcunha](https://github.com/diogofcunha) - [#20](https://github.com/diogofcunha/react-virtualized-tree/pull/20))

  > Refactor of replacement algorithm, with 230k nodes, replacing a node ~500ms (:worried:) to ~10ms (:relaxed:)


##### 1.2.5

- Add typescript type definitions. ([diogofcunha](https://github.com/diogofcunha) - [#19](https://github.com/diogofcunha/react-virtualized-tree/pull/19))
- Node ids can now be strings. ([diogofcunha](https://github.com/diogofcunha) - [#16](https://github.com/diogofcunha/react-virtualized-tree/pull/16))
