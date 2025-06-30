'use client'
import { useLiveQuery } from '@sanity/preview-kit'
import { Post } from '@/types'
import { postsQuery } from '@/lib/queries'
import Posts from './Posts'

export default function PreviewPosts({ posts }: { posts: Post[] }) {
  const [data] = useLiveQuery<Post[]>(posts, postsQuery)

  return (
    <div className="container py-12 md:py-16">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline mb-8">All Posts</h1>
        <Posts posts={data} />
    </div>
  )
}
