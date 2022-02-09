import React from 'react'
import PropTypes from 'prop-types'
import { Button, Menu, Space } from 'antd'
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { useRouter } from 'next/router'
import { signOut, useSession } from 'next-auth/react'

const HeaderMenu = ({}) => {
  const router = useRouter()
  const { data: session } = useSession()
  const loggedIn = session?.user

  return loggedIn ? (
    <Menu title="mainmenu" selectable={false} mode="horizontal">
      <Menu.SubMenu icon={<UserOutlined />} title="Antonios" key="submenu">
        <Menu.Item icon={<UserOutlined />}>Account</Menu.Item>
        <Menu.Item icon={<SettingOutlined />}>Settings</Menu.Item>
        <Menu.Divider />
        <Menu.Item icon={<LogoutOutlined />} onClick={() => signOut()}>
          Logout
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  ) : (
    <Space>
      <Button onClick={() => router.push('login')}>Login</Button>
      <Button type="primary" onClick={() => router.push('/register')}>
        Sign Up
      </Button>
    </Space>
  )
}

HeaderMenu.propTypes = {}

export default HeaderMenu
