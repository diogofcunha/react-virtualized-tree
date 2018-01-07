import React, { Component } from 'react'
import { Sidebar, Segment, Menu, Image, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

class SidebarRightOverlay extends Component {
  render() {
    return (
      <div>
        <Sidebar.Pushable as={Segment}>
          <Sidebar
            as={Menu}
            animation='overlay'
            width='thin'
            direction='right'
            visible
            icon='labeled'
            vertical
            inverted
          >
            <Menu.Item name='home'>
              <Link to='/'>Setup</Link>
            </Menu.Item>
            <Menu.Item name='gamepad'>
              <Link to='docs'>Documentation</Link>
            </Menu.Item>
            <Menu.Item name='camera'>
              <Link to='examples/basic-tree'>Examples</Link>
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher>
            <Segment basic>
              { this.props.children }
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}

export default SidebarRightOverlay
