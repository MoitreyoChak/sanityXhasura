import { PortableText, PortableTextComponents } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

const components: PortableTextComponents = {
  types: {
    image: ({ value }: { value: SanityImageSource & { alt?: string } }) => {
      return (
        <div className="relative my-6 aspect-video rounded-md overflow-hidden">
          <Image
            src={urlFor(value).url()}
            alt={value.alt || 'Blog post image'}
            fill
            className="object-cover"
          />
        </div>
      )
    },
  },
  block: {
    h1: ({ children }) => <h1 className="text-4xl font-bold my-4 font-headline">{children}</h1>,
    h2: ({ children }) => <h2 className="text-3xl font-bold my-4 font-headline">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-bold my-4 font-headline">{children}</h3>,
    h4: ({ children }) => <h4 className="text-xl font-bold my-4 font-headline">{children}</h4>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-4 my-4 italic text-muted-foreground">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
      return (
        <a href={value.href} rel={rel} className="text-primary hover:underline">
          {children}
        </a>
      )
    },
  },
}

export default function PortableTextComponent({ value }: { value: any }) {
  return <PortableText value={value} components={components} />
}
