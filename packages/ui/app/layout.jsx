'use client'

import '../styles/antd.less'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import Amplify, { Auth } from 'aws-amplify'
import axios from 'axios'
import { useRouter } from 'next/router'
// import GlobalLoadingIndicator from '../components/GlobalLoadingIndicator'
import {
  Image,
  Layout,
  Card,
} from 'antd'
import Link from 'next/link'
import BaseLayout from '../components/layouts/BaseLayout'
import SideMenu from '../components/layouts/SideMenu'
import { useMeQuery, useCurrentUserQuery } from '../lib/me'
import theme from '../themes/base'

axios.defaults.baseURL = process.env.NEXT_PUBLIC_ApiEndpoint
Amplify.configure({
  Auth: {
    region: process.env.NEXT_PUBLIC_Region,
    identityPoolId: process.env.NEXT_PUBLIC_CognitoIdentityPoolId,
    userPoolId: process.env.NEXT_PUBLIC_CognitoUserPoolId,
    userPoolWebClientId: process.env.NEXT_PUBLIC_CognitoUserPoolClientId,
  },
  ssr: false,
})
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry(failureCount, error) {
        const errorResponseStatus = error?.response?.status?.toString()
        if (errorResponseStatus?.startsWith('4')) return false

        return failureCount > 2
      },
    },
  },
})

function AppWrapper(props) {
  const router = useRouter()
  // Set Authorization header on all requests if user is signed in
  // Othwerise, redirect to login page
  axios.interceptors.request.use(async (config) => {
    try {
      const currentUserSession = await Auth.currentSession()
      const Authorization = currentUserSession
        .getIdToken()
        .getJwtToken()
      config.headers.Authorization = Authorization
    } catch (e) {
      await router.push('/')
    }

    return config
  })

  return (
    <QueryClientProvider client={queryClient}>
      <AppLayout {...props} />
    </QueryClientProvider>
  )
}
const fontSizeBase = theme['font-size-base']

const Logo = () => (
  <>
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
  </>
)
export default AppWrapper

const AppLayout = ({ children, selectedKey, pageTitle }) => {
  const currentUserQuery = useCurrentUserQuery()
  // eslint-disable-next-line no-unused-vars
  const meQuery = useMeQuery({ isAuthenticated: Boolean(currentUserQuery.data) })

  return (
    <html lang='en'>
      <head>
        <body>
          <BaseLayout pageTitle={pageTitle}>
            <AuthUnauthSwitcher selectedKey={selectedKey} pageTitle={pageTitle}>{children}</AuthUnauthSwitcher>
          </BaseLayout>
        </body>
      </head>
    </html>
  )
}

function AuthUnauthSwitcher({ selectedKey, pageTitle, children }) {
  const currentUserQuery = useCurrentUserQuery({ redirectOnNotAuth: false })
  if (currentUserQuery.isLoading) return null

  if (!currentUserQuery.data) {
    return (
      <BaseLayout pageTitle={pageTitle}>
        <Layout>
          <Layout.Content>
            <Card className='layout-container'>
              <div className='auth-form'>
                <Image
                  src='/welcome.png'
                  alt='Welcome'
                  preview={false}
                />
                {children}
              </div>
            </Card>
          </Layout.Content>
        </Layout>
        <style jsx global>
          {`
              .layout-container {
                width: 400px;
              }
        .ant-layout-content {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          overflow: auto;
        }

        .ant-card-body {
          padding-top: 0;
        }
    `}
        </style>
      </BaseLayout>
    )
  }

  return (
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
  )
}
