import React from 'react'
import { UserOutlined, LogoutOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import Link from 'next/link'

export default function SideMenu({ selectedKey }) {
  return (
    <Menu
      className="siderMenu"
      defaultSelectedKeys={[selectedKey]}
      selectedKeys={[selectedKey]}
      mode="inline"
      theme="dark"
    >
      <Menu.Item key="profile" icon={<UserOutlined />}>
        <Link href="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />}>
        <Link href="/logout">Logout</Link>
      </Menu.Item>
    </Menu>
  )
}
