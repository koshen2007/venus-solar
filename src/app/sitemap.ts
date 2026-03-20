import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://venus-solar-wlzw.vercel.app', // Teri website ka homepage
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1, // 1 matlab sabse highest priority!
    },
    // Agar future mein About, Contact jaise naye page banaye, toh unki entry yahan aayegi
  ]
}