import React from 'react'
import {
  Image,
  Layout,
  Menu,
} from 'antd'
import Link from 'next/link'
import { UserOutlined, LogoutOutlined } from '@ant-design/icons'
import BaseLayout from './BaseLayout'
import { useMeQuery, useCurrentUserQuery } from '../../lib/me'
import theme from '../../themes/base'

const Logo = React.forwardRef(({ onClick, href }, ref) => (
  <a href={href} onClick={onClick} ref={ref}>
    <Image
      className="logo"
      src="/logo.png"
      alt="logo"
      preview={false}
    />
    <style jsx global>
      {`
        a {
          display: inline-block;
        }
        .logo {
          margin-top: 8px;
          margin-left: ${theme.fontSizeBase};
          width: 110px;
        }
      `}
    </style>
  </a>
))

const AppLayout = ({ children, selectedKey, pageTitle }) => {
  const currentUserQuery = useCurrentUserQuery()
  const meQuery = useMeQuery({ isAuthenticated: Boolean(currentUserQuery.data) })

  return (
    <BaseLayout pageTitle={pageTitle}>
      <Layout className="topLayout">
        <Layout.Sider className="sider">
          <Link href="/" passHref>
            <Logo />
          </Link>
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
        </Layout.Sider>
        <Layout className="siteLayout">
          <Layout.Content className="mainContent">
            {children}
          </Layout.Content>
        </Layout>
        <style jsx global>
          {`
            .topLayout {
              min-height: 100vh;
            }

            .sider {
              overflow: auto;
              height: 100vh;
              position: fixed;
              left: 0;
            }

            .siteLayout {
              margin-left: 200px;
            }

            .mainContent {
              margin: ${theme.fontSizeBase};
              overflow: initial;
            }

            .ant-breadcrumb {
              margin-bottom: ${theme.fontSizeBase};
            }
        `}
        </style>
      </Layout>
    </BaseLayout>
  )
}

export default AppLayout
