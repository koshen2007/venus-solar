import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/', // ⚠️ VIP FIX: Google ko Admin panel mein ghusne se rokna hai!
    },
    sitemap: 'https://venus-solar-wlzw.vercel.app/sitemap.xml',
  }
}