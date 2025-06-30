'use client'
import { useLiveQuery } from '@sanity/preview-kit'
import { postBySlugQuery } from '@/lib/queries'
import Post from './Post'

export default function PreviewPost({ post }) {
  const [data] = useLiveQuery(post, postBySlugQuery, { slug: post.slug })

  return <Post post={data} />
}
