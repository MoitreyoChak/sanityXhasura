import { draftMode } from 'next/headers'
import { NextResponse } from 'next/server'

/**
 * @param {import('next/server').NextRequest} req
 */
export function GET(req) {
  draftMode().disable()
  const url = new URL(req.nextUrl)
  return NextResponse.redirect(new URL('/', url.origin))
}
