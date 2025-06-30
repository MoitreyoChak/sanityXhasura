'use client'
import { useLiveQuery } from '@sanity/preview-kit'
import { Post as PostType } from '@/types'
import { postBySlugQuery } from '@/lib/queries'
import Post from './Post'

export default function PreviewPost({ post }: { post: PostType }) {
  const [data] = useLiveQuery<PostType>(post, postBySlugQuery, { slug: post.slug })

  return <Post post={data} />
}
