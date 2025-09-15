import { Metadata } from 'next'

interface PageMetaProps {
  title: string
  description: string
  image?: string
  url?: string
}

// Función para generar metadata object para App Router
export function generatePageMetadata({
  title,
  description,
  image,
  url
}: PageMetaProps): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://isavan.cl'
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl
  const fullTitle = title.includes('Isavan') ? title : `${title} - Transporte Isavan`
  
  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      url: fullUrl,
      siteName: 'Transporte Isavan',
      images: image ? [{
        url: image,
        width: 1200,
        height: 630,
        alt: title
      }] : [],
      locale: 'es_CL',
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: image ? [image] : []
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    },
    alternates: {
      canonical: fullUrl
    }
  }
}

// Componente React para metadata (si se necesita renderizar en el head)
export function PageMeta({ title, description, image, url }: PageMetaProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://isavan.cl'
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl
  const fullTitle = title.includes('Isavan') ? title : `${title} - Transporte Isavan`
  
  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="Transporte Isavan" />
      <meta property="og:locale" content="es_CL" />
      <meta property="og:type" content="website" />
      {image && (
        <>
          <meta property="og:image" content={image} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:image:alt" content={title} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:image" content={image} />
        </>
      )}
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <link rel="canonical" href={fullUrl} />
    </>
  )
}

// Metadata por defecto para la aplicación
export const defaultMetadata: Metadata = {
  title: 'Transporte Isavan - Servicios de Transporte en Valparaíso',
  description: 'Servicios de transporte seguro y confiable en la región de Valparaíso. Traslados a aeropuerto, eventos, conciertos y más.',
  keywords: ['transporte', 'valparaíso', 'aeropuerto', 'conciertos', 'eventos', 'traslados'],
  authors: [{ name: 'Transporte Isavan' }],
  creator: 'Transporte Isavan',
  publisher: 'Transporte Isavan',
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  }
}