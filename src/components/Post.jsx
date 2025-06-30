import Image from 'next/image'
import { format } from 'date-fns'
import { urlFor } from '@/lib/sanity'
import PortableTextComponent from './PortableTextComponent'

export default function Post({ post }) {
  return (
    <article className="container max-w-3xl py-12 md:py-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold font-headline tracking-tight mb-4">
          {post.title}
        </h1>
        <div className="text-muted-foreground">
          <span>By {post.author}</span>
          <span className="mx-2">•</span>
          <span>{format(new Date(post.publishedAt), 'MMMM d, yyyy')}</span>
        </div>
      </div>
      <div className="aspect-video rounded-xl overflow-hidden mb-12">
        <Image
          src={urlFor(post.mainImage).width(1200).height(675).url()}
          alt={post.title}
          width={1200}
          height={675}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none mx-auto">
        <PortableTextComponent value={post.body} />
      </div>
    </article>
  )
}
