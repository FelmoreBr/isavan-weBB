import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

// Configuración del cliente de Sanity
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
})

// Builder para URLs de imágenes
const builder = imageUrlBuilder(client)

// Función para generar URLs de imágenes
export function urlForImage(source: SanityImageSource) {
  return builder.image(source)
}