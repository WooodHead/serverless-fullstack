import React from 'react'
import { UserOutlined, LogoutOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import Link from 'next/link'

export default function SideMenu({ selectedKey }) {
  const items = [{
    key: 'profile',
    icon: <UserOutlined />,
    label: <Link href='/profile'>Profile</Link>,
  }, {
    key: 'logout',
    icon: <LogoutOutlined />,
    label: <Link href='/logout'>Logout</Link>,
  },
  ]
  return (
    <Menu
      className='siderMenu'
      defaultSelectedKeys={[selectedKey]}
      selectedKeys={[selectedKey]}
      mode='inline'
      theme='dark'
      items={items}
    />
  )
}
