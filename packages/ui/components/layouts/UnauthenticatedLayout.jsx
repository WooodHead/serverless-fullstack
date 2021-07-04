import React from 'react'
import { Card, Layout, Image } from 'antd'
import BaseLayout from './BaseLayout'

export default function UnauthenticatedLayout({
  children,
  pageTitle,
}) {
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
