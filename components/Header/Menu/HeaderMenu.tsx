import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';



const HeaderMenu = (props) => {
  return <Menu  title="mainmenu" selectable={false} mode="horizontal">
        <Menu.SubMenu icon={<UserOutlined />} title="User" key="submenu">
          <Menu.Item>Account</Menu.Item>
        <Menu.Divider/>
          <Menu.Item>Logout</Menu.Item>
        </Menu.SubMenu>
  </Menu>;
};

HeaderMenu.propTypes = {};

export default HeaderMenu;
