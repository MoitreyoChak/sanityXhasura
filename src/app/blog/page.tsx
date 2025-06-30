import { draftMode } from 'next/headers'
import { client } from '@/lib/sanity'
import { postsQuery } from '@/lib/queries'
import { Post } from '@/types'
import Posts from '@/components/Posts'
import PreviewPosts from '@/components/PreviewPosts'

export default async function BlogPage() {
  const { isEnabled } = draftMode()
  const posts: Post[] = await client.fetch(postsQuery)

  if (isEnabled) {
    return <PreviewPosts posts={posts} />
  }

  return (
    <div className="container py-12 md:py-16">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline mb-8">All Posts</h1>
        <Posts posts={posts} />
    </div>
  )
}
