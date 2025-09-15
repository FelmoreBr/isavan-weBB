import { notFound } from 'next/navigation'
import Image from 'next/image'
import { fetchConciertos, fetchConcierto, fetchComunas } from '@/lib/queries'
import { urlForImage } from '@/lib/sanity'
import Cotizador from '@/components/Cotizador'

// Función para generar parámetros estáticos
export async function generateStaticParams() {
  const conciertos = await fetchConciertos()
  return conciertos.map((concierto) => ({
    slug: concierto.slug,
  }))
}

// Función para generar metadata dinámico
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const concierto = await fetchConcierto(slug)
  
  if (!concierto) {
    return {
      title: 'Concierto no encontrado',
      description: 'El concierto que buscas no existe.'
    }
  }

  return {
    title: `${concierto.titulo} - Transporte Isavan`,
    description: concierto.descripcion || `Transporte seguro y cómodo para ${concierto.titulo}`,
    openGraph: {
      title: `${concierto.titulo} - Transporte Isavan`,
      description: concierto.descripcion || `Transporte seguro y cómodo para ${concierto.titulo}`,
      images: concierto.flyer ? [{
        url: urlForImage(concierto.flyer).width(1200).height(630).url(),
        width: 1200,
        height: 630,
        alt: concierto.titulo
      }] : []
    }
  }
}

// Función para formatear fecha
function formatearFecha(fechaISO: string) {
  const fecha = new Date(fechaISO)
  return fecha.toLocaleDateString('es-CL', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Función para generar mensaje de WhatsApp
function generarMensajeWhatsApp(titulo: string, fecha: string, lugar?: string) {
  const fechaFormateada = formatearFecha(fecha)
  const lugarTexto = lugar ? ` en ${lugar}` : ''
  const mensaje = `Hola! Me interesa el transporte para ${titulo} el ${fechaFormateada}${lugarTexto}. ¿Podrían darme más información?`
  return `https://wa.me/56912345678?text=${encodeURIComponent(mensaje)}`
}

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function ConciertoPagina({ params }: PageProps) {
  const { slug } = await params
  const concierto = await fetchConcierto(slug)
  const comunas = await fetchComunas()

  if (!concierto) {
    notFound()
  }

  // Extraer solo los nombres de las comunas para el componente
  const nombresComunas = comunas.map(comuna => comuna.nombre)

  const fechaFormateada = formatearFecha(concierto.fecha)
  const urlWhatsApp = generarMensajeWhatsApp(concierto.titulo, concierto.fecha, concierto.lugar)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
        {concierto.flyer && (
          <Image
            src={urlForImage(concierto.flyer).width(1200).height(400).url()}
            alt={concierto.titulo}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative h-full flex items-center justify-center text-center text-white px-4">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {concierto.titulo}
            </h1>
            <p className="text-xl md:text-2xl mb-2">
              {fechaFormateada}
            </p>
            <p className="text-lg md:text-xl text-purple-200">
              {concierto.lugar}
            </p>
          </div>
        </div>
      </section>

      {/* Contenido Principal */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contenido */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Sobre el Evento</h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed">
                    {concierto.descripcion || 'Información del evento próximamente disponible.'}
                  </p>
                </div>
              </div>


            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Información del Evento */}
              <div className="bg-white rounded-lg shadow-lg p-6 mb-6 sticky top-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Información del Evento</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-purple-500 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p className="font-medium text-gray-900">Fecha y Hora</p>
                      <p className="text-gray-600 text-sm">{fechaFormateada}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-purple-500 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <p className="font-medium text-gray-900">Ubicación</p>
                      <p className="text-gray-600 text-sm">{concierto.lugar}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-purple-500 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                    <div>
                      <p className="font-medium text-gray-900">Precio</p>
                      <p className="text-gray-600 text-sm">Consultar</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-3">Reserva tu Transporte</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Viaja cómodo y seguro al evento. Horarios especiales disponibles.
                  </p>
                  
                  <div className="space-y-3">
                    <a
                      href={urlWhatsApp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center"
                    >
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                      </svg>
                      Contactar por WhatsApp
                    </a>
                    
                    <div className="mt-4">
                      <Cotizador comunas={nombresComunas} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}