import React from 'react';
import { Segment, Header } from 'semantic-ui-react'

export default () => <div>
  <Header as='h2'>
    Introduction
  </Header>
  <Segment basic>
    <p><b>react-virtualized-tree</b> is a react library built on top of <a href={"https://bvaughn.github.io/react-virtualized/#/components/List"}>react-virtualized</a>.</p>
    <p>Its main goal is to display tree like data in a beautiful and fast way.</p> 
    <p>Being a reactive library it uses children functions to achieve maximum extansability</p>
    <p>The core idea behind it is that anyone using it is enable to create a tree as they wich just by rendering their own components or components exported by the tree</p>
  </Segment>
  <Header as='h2'>
    Installation
  </Header>
  <Segment basic>
    <p>You can install via npm or yarn.</p>
    <Segment compact>
      <code>npm i react-virtualized-tree --save</code>
    </Segment>
    <Segment compact>
      <code>yarn add react-virtualized-tree</code>
    </Segment>
  </Segment>
  <Header as='h2'>
    Dependencies
  </Header>
  <Segment>
  </Segment>
</div>;
