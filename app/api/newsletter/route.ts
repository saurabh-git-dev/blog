import { NewsletterAPI } from 'pliny/newsletter'
import siteMetadata from '@/data/siteMetadata'

export const dynamic = 'force-static'

const provider = siteMetadata.newsletter?.provider

const newsletterHandler = provider
  ? NewsletterAPI({
      provider,
    })
  : null

async function handler(request: Request) {
  if (!newsletterHandler) {
    return new Response('Newsletter is not configured', { status: 404 })
  }

  return newsletterHandler(request)
}

export { handler as GET, handler as POST }
