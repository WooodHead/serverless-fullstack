import { Result } from 'antd'
import Link from 'next/link'
import React from 'react'
import AppLayout from '../components/layouts/AppLayout'
import { useCurrentUserQuery } from '../lib/me'

export default function Page404() {
  const currentUserQuery = useCurrentUserQuery({ redirectOnNotAuth: false })

  if (currentUserQuery.isLoading) return null

  if (currentUserQuery.data) {
    return (
      <AppLayout>
        <FourOhFour />
      </AppLayout>
    )
  }
  return <FourOhFour />
}

function FourOhFour() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Link href="/">Back Home</Link>}
    />
  )
}
