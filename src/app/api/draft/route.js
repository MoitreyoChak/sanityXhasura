import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

/**
 * @param {Request} request
 */
export function GET(request) {
  draftMode().enable()
  // Redirect to the path from the fetched post
  // This implementation is incomplete as it doesn't handle the slug
  // In a real-world scenario, you'd pass the slug to redirect to the correct page
  redirect('/')
}
