import React from 'react'
import PropTypes from 'prop-types'
import { Button, Menu, Space } from 'antd'
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { useRouter } from 'next/router'
import { useAppSelector, useAppDispatch } from '../../../redux/hooks'
import { logout as stateLogout } from '../../../redux/features/userSlice'
import { LOGOUT } from '../graphql/logout'
import { useMutation } from '@apollo/client'

const HeaderMenu = ({}) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const loggedIn = useAppSelector((state) => state.user.loggedIn)
  const [logout, { data, error, loading }] = useMutation(LOGOUT)
  if (error) return <div>there is ane error</div>

  return loggedIn ? (
    <Menu title="mainmenu" selectable={false} mode="horizontal">
      <Menu.SubMenu icon={<UserOutlined />} title="Antonios" key="submenu">
        <Menu.Item icon={<UserOutlined />}>Account</Menu.Item>
        <Menu.Item icon={<SettingOutlined />}>Settings</Menu.Item>
        <Menu.Divider />
        <Menu.Item
          icon={<LogoutOutlined />}
          onClick={() => {
            logout({ variables: { email: 'antonios.papadopan@gmail.com' } })
            dispatch(stateLogout())
          }}
        >
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
