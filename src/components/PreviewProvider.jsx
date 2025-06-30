'use client'

import { LiveQueryProvider } from '@sanity/preview-kit'
import { client } from '@/lib/sanity'

export function PreviewProvider({
  children,
  token,
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
