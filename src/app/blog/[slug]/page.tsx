import { draftMode } from 'next/headers'
import { client } from '@/lib/sanity'
import { postBySlugQuery, postPathsQuery } from '@/lib/queries'
import { Post as PostType } from '@/types'
import Post from '@/components/Post'
import PreviewPost from '@/components/PreviewPost'
import { notFound } from 'next/navigation'

type Props = {
  params: { slug: string }
}

export async function generateStaticParams() {
  const posts = await client.fetch<{ slug: string }[]>(postPathsQuery)
  return posts.map((post) => ({ slug: post.slug }))
}

export default async function PostPage({ params }: Props) {
  const { isEnabled } = draftMode()
  const post: PostType = await client.fetch(postBySlugQuery, { slug: params.slug })

  if (!post) {
    notFound();
  }

  if (isEnabled) {
    return <PreviewPost post={post} />
  }

  return <Post post={post} />
}
