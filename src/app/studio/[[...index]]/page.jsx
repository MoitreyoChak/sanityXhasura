

import { Studio } from '@/components/Studio'

// Ensures the Studio route is statically generated
export const dynamic = 'force-static'

// Set the right `viewport` for the studio
export { viewport } from 'next-sanity/studio'

export default function StudioPage() {
  return <Studio />
}
