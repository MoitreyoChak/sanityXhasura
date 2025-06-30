import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns'
import { Post } from '@/types'
import { urlFor } from '@/lib/sanity'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function Posts({ posts }: { posts: Post[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <Link href={`/blog/${post.slug}`} key={post._id}>
          <Card className="overflow-hidden h-full group">
            <CardHeader className="p-0">
              <div className="aspect-video overflow-hidden">
                <Image
                  src={urlFor(post.mainImage).width(500).height(300).url()}
                  alt={post.title}
                  width={500}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold font-headline mb-2 group-hover:text-primary transition-colors">{post.title}</h2>
              <p className="text-muted-foreground text-sm">
                {format(new Date(post.publishedAt), 'MMMM d, yyyy')}
              </p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
