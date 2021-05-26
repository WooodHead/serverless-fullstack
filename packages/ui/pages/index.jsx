import React from 'react'
import {
  Breadcrumb,
  Button,
  Checkbox,
  Form,
  Input,
  Result,
} from 'antd'
import { HomeOutlined, UserOutlined, SmileOutlined } from '@ant-design/icons'
import Link from 'next/link'
import UnauthenticatedLayout from '../components/layouts/UnauthenticatedLayout'
import AppLayout from '../components/layouts/AppLayout'
import { useCurrentUserQuery, useSignInMutation } from '../lib/me'

export default function IndexPage() {
  const currentUserQuery = useCurrentUserQuery({ redirectOnNotAuth: false })
  if (currentUserQuery.isLoading) return null

  if (currentUserQuery.data) {
    return <AuthenticatedRoot />
  }

  return <Login />
}

function AuthenticatedRoot() {
  return (
    <AppLayout pageTitle="Home" selectedKey="profile">
      <Breadcrumb>
        <Breadcrumb.Item href="/">
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <UserOutlined />
          <span>Profile</span>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Result
        icon={<SmileOutlined />}
        title="We're all set here!"
      />
    </AppLayout>
  )
}

function Login() {
  const signInMutation = useSignInMutation()
  return (
    <UnauthenticatedLayout pageTitle="Login">
      <Form
        layout="vertical"
        name="login_form"
        initialValues={{ remember: true }}
        onFinish={signInMutation.mutate}
      >
        <Form.Item
          label="Email"
          name="username"
          required={false}
          rules={[
            {
              required: true,
              message: 'Please input your email!',
              type: 'email',
            },
          ]}
        >
          <Input type="email" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          required={false}
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Button
            loading={signInMutation.isLoading}
            style={{ float: 'right' }}
            type="primary"
            htmlType="submit"
          >
            Sign in
          </Button>
        </Form.Item>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Link href="/register">Register</Link>
          <Link href="/forgot-password">Forgot your password?</Link>
        </div>
      </Form>
    </UnauthenticatedLayout>
  )
}
