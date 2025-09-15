import { client } from './sanity'

// Consultas GROQ
export const GET_CONCIERTOS = `*[_type == "concierto"] | order(fecha asc){
  ...,
  "slug": slug.current
}`

export const GET_CONCIERTO_BY_SLUG = `*[_type == "concierto" && slug.current == $slug][0]{
  ...,
  "slug": slug.current
}`

export const GET_COMUNAS = `*[_type == "comuna"] | order(orden asc){
  nombre,
  "slug": slug.current,
  imagen
}`

export const GET_VEHICULOS = `*[_type == "vehiculo"]{
  modelo,
  capacidad,
  descripcion,
  imagen
}`

// Tipos TypeScript
export interface Concierto {
  _id: string
  _type: 'concierto'
  titulo: string
  slug: string
  fecha: string
  lugar?: string
  flyer?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
  }
  descripcion?: string
  contenido?: Array<{
    _type: string
    [key: string]: unknown
  }>
  estado: 'disponible' | 'ultimos-cupos' | 'agotado'
}

export interface Comuna {
  nombre: string
  slug: string
  imagen?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
  }
}

export interface Vehiculo {
  modelo: string
  capacidad?: number
  descripcion?: string
  imagen?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
  }
}

// Funciones de fetch
export async function fetchConciertos(): Promise<Concierto[]> {
  try {
    const conciertos = await client.fetch(GET_CONCIERTOS)
    return conciertos
  } catch (error) {
    console.error('Error fetching conciertos:', error)
    return []
  }
}

export async function fetchConcierto(slug: string): Promise<Concierto | null> {
  try {
    const concierto = await client.fetch(GET_CONCIERTO_BY_SLUG, { slug })
    return concierto
  } catch (error) {
    console.error('Error fetching concierto:', error)
    return null
  }
}

export async function fetchComunas(): Promise<Comuna[]> {
  try {
    const comunas = await client.fetch(GET_COMUNAS)
    return comunas
  } catch (error) {
    console.error('Error fetching comunas:', error)
    return []
  }
}

export async function fetchVehiculos(): Promise<Vehiculo[]> {
  try {
    const vehiculos = await client.fetch(GET_VEHICULOS)
    return vehiculos
  } catch (error) {
    console.error('Error fetching vehiculos:', error)
    return []
  }
}