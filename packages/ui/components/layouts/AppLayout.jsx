import React from 'react'
import {
  Image,
  Layout,
} from 'antd'
import Link from 'next/link'
import BaseLayout from './BaseLayout'
import SideMenu from './SideMenu'
import { useMeQuery, useCurrentUserQuery } from '../../lib/me'
import theme from '../../themes/base'

const fontSizeBase = theme['font-size-base']

const Logo = React.forwardRef(({ href }, ref) => (
  <a href={href} ref={ref}>
    <Image
      className='logo'
      src='/logo.png'
      alt='logo'
      preview={false}
    />
    <style jsx global>
      {`
        a {
          display: inline-block;
        }
        .logo {
          margin-top: 8px;
          margin-left: ${fontSizeBase};
          width: 110px;
        }
      `}
    </style>
  </a>
))

const AppLayout = ({ children, selectedKey, pageTitle }) => {
  const currentUserQuery = useCurrentUserQuery()
  // eslint-disable-next-line no-unused-vars
  const meQuery = useMeQuery({ isAuthenticated: Boolean(currentUserQuery.data) })

  return (
    <BaseLayout pageTitle={pageTitle}>
      <Layout className='topLayout'>
        <Layout.Sider className='sider'>
          <Link href='/' passHref>
            <Logo />
          </Link>
          <SideMenu selectedKey={selectedKey} />
        </Layout.Sider>
        <Layout className='siteLayout'>
          <Layout.Content className='mainContent'>
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
              margin: ${fontSizeBase};
              overflow: auto;
            }

            .ant-breadcrumb {
              margin-bottom: ${fontSizeBase};
            }
        `}
        </style>
      </Layout>
    </BaseLayout>
  )
}

export default AppLayout
