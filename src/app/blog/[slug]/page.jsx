import { draftMode } from "next/headers";
import { client } from "@/lib/sanity";
import { postBySlugQuery, postPathsQuery } from "@/lib/queries";
import Post from "@/components/Post";
import PreviewPost from "@/components/PreviewPost";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const posts = await client.fetch(postPathsQuery);
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function PostPage({ params }) {
  const { isEnabled } = await draftMode();
  const { slug } = params; // params is not a promise, so no need to await
  const post = await client.fetch(postBySlugQuery, { slug });

  if (!post) {
    notFound();
  }

  if (isEnabled) {
    return <PreviewPost post={post} />;
  }

  return <Post post={post} />;
}
