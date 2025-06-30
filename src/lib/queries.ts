import { groq } from "next-sanity";

export const postsQuery = groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc){
    _id,
    title,
    "slug": slug.current,
    mainImage,
    publishedAt,
    "author": author->name,
    body
  }`;

export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    mainImage,
    publishedAt,
    "author": author->name,
    body
  }`;

export const postPathsQuery = groq`*[_type == "post" && defined(slug.current)][]{
    "slug": slug.current
  }`;
