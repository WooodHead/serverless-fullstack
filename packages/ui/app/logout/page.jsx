'use client'

import { useEffect } from 'react'
import { useSignOutMutation } from '../../lib/me'

export default function LogoutPage() {
  const signOutMutation = useSignOutMutation()
  useEffect(() => {
    signOutMutation.mutate()
  }, [])

  return null
}
