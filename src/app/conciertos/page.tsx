import ConciertosCarousel from '@/components/ConciertosCarousel'
import { fetchConciertos } from '@/lib/queries'
import { urlForImage } from '@/lib/sanity'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Conciertos y Eventos - Transporte Isavan',
  description: 'Transporte seguro y cómodo a los mejores eventos de la región de Valparaíso',
  openGraph: {
    title: 'Conciertos y Eventos - Transporte Isavan',
    description: 'Transporte seguro y cómodo a los mejores eventos de la región de Valparaíso',
  },
}

export default async function ConciertosPage() {
  const conciertos = await fetchConciertos()
  
  // Transformar los datos para que sean compatibles con ConciertosCarousel
  const eventosTransformados = conciertos.map(concierto => ({
    titulo: concierto.titulo,
    fecha: concierto.fecha,
    lugar: concierto.lugar || 'Por confirmar',
    flyerUrl: concierto.flyer ? urlForImage(concierto.flyer).url() : '/images/default-event.jpg',
    slug: concierto.slug,
    estado: concierto.estado
  }))
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Conciertos y <span className="text-purple-400">Eventos</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-purple-100 max-w-3xl mx-auto">
            Transporte seguro y cómodo a los mejores eventos de la región
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300">
              Ver Todos los Eventos
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-purple-900 font-bold py-3 px-8 rounded-lg transition-all duration-300">
              Cotizar Transporte
            </button>
          </div>
        </div>
      </section>

      {/* Eventos Destacados */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Próximos Eventos
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Descubre los eventos más esperados de la región y reserva tu transporte con anticipación.
            </p>
          </div>
          <ConciertosCarousel eventos={eventosTransformados} />
        </div>
      </section>

      {/* Servicios para Eventos */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Servicios Especiales para Eventos
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Transporte Grupal</h3>
              <p className="text-gray-600 text-sm">Vehículos para grupos grandes con descuentos especiales.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Horarios Flexibles</h3>
              <p className="text-gray-600 text-sm">Adaptamos nuestros horarios al inicio y fin del evento.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Reserva Garantizada</h3>
              <p className="text-gray-600 text-sm">Tu lugar está asegurado, sin preocupaciones de último minuto.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Servicio Premium</h3>
              <p className="text-gray-600 text-sm">Comodidad y atención personalizada para una experiencia única.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-purple-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Listo para tu próximo evento?
          </h2>
          <p className="text-xl mb-8 text-purple-100">
            Reserva tu transporte ahora y disfruta del evento sin preocupaciones.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-900 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition-colors duration-300">
              Cotizar Ahora
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-purple-900 font-bold py-3 px-8 rounded-lg transition-all duration-300">
              Contactar por WhatsApp
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}