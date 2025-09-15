import { urlForImage } from '@/lib/sanity'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

interface ImageOptions {
  width?: number
  height?: number
  quality?: number
  format?: 'jpg' | 'png' | 'webp'
  fit?: 'clip' | 'crop' | 'fill' | 'fillmax' | 'max' | 'scale' | 'min'
}

// Función principal para generar URLs de imágenes optimizadas
export function getImageUrl(
  source: SanityImageSource,
  options: ImageOptions = {}
): string {
  if (!source) {
    return ''
  }

  let builder = urlForImage(source)

  // Aplicar width si se especifica
  if (options.width) {
    builder = builder.width(options.width)
  }

  // Aplicar height si se especifica
  if (options.height) {
    builder = builder.height(options.height)
  }

  // Aplicar quality si se especifica (1-100)
  if (options.quality) {
    builder = builder.quality(Math.min(100, Math.max(1, options.quality)))
  }

  // Aplicar format si se especifica
  if (options.format) {
    builder = builder.format(options.format)
  }

  // Aplicar fit si se especifica
  if (options.fit) {
    builder = builder.fit(options.fit)
  }

  return builder.url()
}

// Función específica para imágenes responsivas
export function getResponsiveImageUrl(
  source: SanityImageSource,
  width: number,
  quality: number = 80
): string {
  return getImageUrl(source, {
    width,
    quality,
    format: 'webp'
  })
}

// Función para generar múltiples tamaños (srcset)
export function generateSrcSet(
  source: SanityImageSource,
  widths: number[] = [320, 640, 768, 1024, 1280, 1920],
  quality: number = 80
): string {
  if (!source) {
    return ''
  }

  return widths
    .map(width => {
      const url = getResponsiveImageUrl(source, width, quality)
      return `${url} ${width}w`
    })
    .join(', ')
}

// Función para obtener imagen de placeholder/blur
export function getBlurDataUrl(
  source: SanityImageSource,
  width: number = 20,
  quality: number = 20
): string {
  return getImageUrl(source, {
    width,
    quality,
    format: 'jpg'
  })
}

// Función para imágenes de hero/banner
export function getHeroImageUrl(
  source: SanityImageSource,
  width: number = 1920,
  height: number = 1080
): string {
  return getImageUrl(source, {
    width,
    height,
    quality: 85,
    format: 'webp',
    fit: 'crop'
  })
}

// Función para thumbnails
export function getThumbnailUrl(
  source: SanityImageSource,
  size: number = 300
): string {
  return getImageUrl(source, {
    width: size,
    height: size,
    quality: 80,
    format: 'webp',
    fit: 'crop'
  })
}

// Función para imágenes de Open Graph
export function getOgImageUrl(
  source: SanityImageSource
): string {
  return getImageUrl(source, {
    width: 1200,
    height: 630,
    quality: 85,
    format: 'jpg',
    fit: 'crop'
  })
}