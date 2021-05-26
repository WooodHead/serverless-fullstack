import React from 'react'
import Head from 'next/head'

const APP_NAME = 'My App'

function getPageTitle(pageTitle) {
  return pageTitle ? ` - ${pageTitle}` : ''
}

function getTitle(pageTitle) {
  return `${APP_NAME}${getPageTitle(pageTitle)}`
}

export default function UnauthenticatedLayout({
  children,
  pageTitle,
  title = getTitle(pageTitle),
}) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      {children}
    </>
  )
}
