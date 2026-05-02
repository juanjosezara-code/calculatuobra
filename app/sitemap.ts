import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.calculatuobra.cl';
  return [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/calculadora`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
  ];
}
