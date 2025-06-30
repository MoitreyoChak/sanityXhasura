'use client'

import { LiveQueryProvider } from '@sanity/preview-kit'
import { client } from '@/lib/sanity'

export function PreviewProvider({
  children,
  token,
}: {
  children: React.ReactNode
  token?: string
}) {
  if (!token) {
    return <>{children}</>
  }
  return (
    <LiveQueryProvider client={client} token={token}>
      {children}
    </LiveQueryProvider>
  )
}
