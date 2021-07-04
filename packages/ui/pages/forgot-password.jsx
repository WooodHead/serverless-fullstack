import React from 'react'
import {
  Button,
  Typography,
  Form,
  Input,
} from 'antd'
import Link from 'next/link'
import UnauthenticatedLayout from '../components/layouts/UnauthenticatedLayout'
import { useForgotPasswordMutation } from '../lib/me'

const { Title } = Typography

export default function App() {
  const forgotPasswordMutation = useForgotPasswordMutation()

  return (
    <UnauthenticatedLayout>
      <Title level={3}>Forgot your password?</Title>
      <Form
        layout='vertical'
        name='forgotPasswordForm'
        onFinish={forgotPasswordMutation.mutate}
      >
        <Form.Item
          label='Email'
          name='username'
          required={false}
          rules={[
            {
              required: true,
              message: 'Please input your email!',
              type: 'email',
            },
          ]}
        >
          <Input type='email' />
        </Form.Item>
        <Form.Item style={{ margin: '0' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button style={{ marginRight: '1rem' }}>
              <Link href='/'>Back to login</Link>
            </Button>
            <Button
              type='primary'
              disabled={forgotPasswordMutation.isLoading}
              loading={forgotPasswordMutation.isLoading}
              htmlType='submit'
              className='forgot-password-form-button'
            >
              Reset Password
            </Button>
          </div>
        </Form.Item>
      </Form>
    </UnauthenticatedLayout>
  )
}
