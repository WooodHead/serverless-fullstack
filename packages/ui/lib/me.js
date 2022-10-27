'use client'

import axios from 'axios'
import { useQuery, useMutation } from 'react-query'
import { Auth } from 'aws-amplify'
import { useRouter } from 'next/navigation'
import { notification } from 'antd'

export function useCurrentUserQuery({ redirectOnNotAuth = true } = {}) {
  const router = useRouter()
  const currentUserQuery = useQuery(
    'currentUser',
    async () => {
      try {
        const currentAuthenticatedUser = await Auth.currentAuthenticatedUser()
        return currentAuthenticatedUser
      } catch (error) {
        if (redirectOnNotAuth) {
          router.push('/')
        }
        return null
      }
    },
    {
      retry: false,
    },
  )
  return currentUserQuery
}

export function useSignInMutation() {
  const currentUserQuery = useCurrentUserQuery({ redirectOnNotAuth: false })
  const signInMutation = useMutation(async ({ username, password }) => {
    await Auth.signIn(username, password)
    await currentUserQuery.refetch()
  },
  {
    onError: (err) => {
      notification.error({
        message: 'Login failed',
        description: err.message,
        placement: 'topRight',
      })
    },
  })

  return signInMutation
}

export function useSignUpMutation() {
  const signInMutation = useSignInMutation()
  const router = useRouter()
  const signUpMutation = useMutation(async ({ name, password, username }) => {
    await Auth.signUp({
      username,
      password,
      attributes: { email: username, name },
    })
    await signInMutation.mutateAsync({ username, password })
    router.push('/')
  },
  {
    onError: async (err) => notification.error({
      message: 'Error',
      description: err.message,
      placement: 'topRight',
    }),
  })

  return signUpMutation
}

export function useSignOutMutation() {
  const router = useRouter()
  const signOutMutation = useMutation(() => Auth.signOut({ global: true }), {
    onSuccess: () => router.push('/'),
    onError: (err) => notification.error({
      message: 'Error trying to logout',
      description: err.message,
      placement: 'topRight',
    }),
  })

  return signOutMutation
}

export function useMeQuery({ isAuthenticated }) {
  const meQuery = useQuery(
    'me',
    () => axios.get('/me'),
    { retry: false, enabled: isAuthenticated },
  )
  return meQuery
}

export function useForgotPasswordMutation() {
  const router = useRouter()
  const forgotPasswordMutation = useMutation(
    async ({ username }) => {
      await Auth.forgotPassword(username)
      notification.success({
        message: 'Password reset link sent',
        description: 'Instructions have been sent to your email.',
        placement: 'topRight',
      })
      await router.push(`/reset-password?username=${username}`)
    },
    {
      onError: async (err) => {
        notification.error({
          message: 'Forgot password failed',
          description: err.message,
          placement: 'topRight',
        })
      },
    },
  )

  return forgotPasswordMutation
}

export function useResetPasswordMutation() {
  const signInMutation = useSignInMutation()
  const router = useRouter()
  const resetPasswordMutation = useMutation(async ({ username, code, password }) => {
    await Auth.forgotPasswordSubmit(
      username.trim(),
      code.trim(),
      password.trim(),
    )
    await signInMutation.mutateAsync({ username, password })
    router.push('/')
  },
  {
    onError: async (err) => notification.error({
      message: 'Error resetting password',
      description: err.message,
      placement: 'topRight',
    }),
  })

  return resetPasswordMutation
}
