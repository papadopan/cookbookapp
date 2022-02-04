import React from 'react'
import PropTypes from 'prop-types'
import { Menu } from 'antd'
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons'

const HeaderMenu = (props) => {
  return (
    <Menu title="mainmenu" selectable={false} mode="horizontal">
      <Menu.SubMenu icon={<UserOutlined />} title="Antonios" key="submenu">
        <Menu.Item icon={<UserOutlined />}>Account</Menu.Item>
        <Menu.Item icon={<SettingOutlined />}>Settings</Menu.Item>
        <Menu.Divider />
        <Menu.Item icon={<LogoutOutlined />}>Logout</Menu.Item>
      </Menu.SubMenu>
    </Menu>
  )
}

HeaderMenu.propTypes = {}

export default HeaderMenu
