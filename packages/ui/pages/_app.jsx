import '../styles/antd.less'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import Amplify, { Auth } from 'aws-amplify'
import axios from 'axios'
import { useRouter } from 'next/router'
// import GlobalLoadingIndicator from '../components/GlobalLoadingIndicator'

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
      <App {...props} />
    </QueryClientProvider>
  )
}

function App({ Component, pageProps }) {
  return (
    <>
      {/* <GlobalLoadingIndicator /> */}
      <Component {...pageProps} />
    </>
  )
}

export default AppWrapper
