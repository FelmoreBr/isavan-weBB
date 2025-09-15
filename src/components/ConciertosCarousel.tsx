'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules'
import Link from 'next/link'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

interface EventoItem {
  titulo: string
  fecha: string
  lugar: string
  flyerUrl: string
  slug: string
  estado: 'disponible' | 'ultimos-cupos' | 'agotado'
}

interface Props {
  eventos: EventoItem[]
}

const ConciertosCarousel: React.FC<Props> = ({ eventos }) => {
  const formatearFecha = (fecha: string) => {
    try {
      const date = new Date(fecha)
      return date.toLocaleDateString('es-CL', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    } catch {
      return fecha
    }
  }

  const getEstadoConfig = (estado: string) => {
    switch (estado) {
      case 'disponible':
        return {
          color: 'bg-green-500',
          glow: 'shadow-green-500/50',
          text: 'Cupos Disponibles',
          textColor: 'text-green-400'
        }
      case 'ultimos-cupos':
        return {
          color: 'bg-amber-500',
          glow: 'shadow-amber-500/50',
          text: '¡Últimos Cupos!',
          textColor: 'text-amber-400'
        }
      case 'agotado':
        return {
          color: 'bg-red-500',
          glow: 'shadow-red-500/50',
          text: 'Agotado',
          textColor: 'text-red-400'
        }
      default:
        return {
          color: 'bg-green-500',
          glow: 'shadow-green-500/50',
          text: 'Cupos Disponibles',
          textColor: 'text-green-400'
        }
    }
  }

  return (
    <div className="w-full py-8">
      <Swiper
        modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        loop={true}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          320: {
            slidesPerView: 1.2,
          },
          640: {
            slidesPerView: 1.5,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        className="conciertos-carousel"
      >
        {eventos.map((evento, index) => {
          const estadoConfig = getEstadoConfig(evento.estado)
          
          return (
             <SwiperSlide key={index} className="!w-[500px]">
              {evento.estado === 'agotado' ? (
                <div className="group cursor-not-allowed opacity-75">
                  <div className="relative bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300">
                    {/* Estado Indicator */}
                    <div className="absolute top-4 right-4 z-10">
                      <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${estadoConfig.color} ${estadoConfig.glow} shadow-lg backdrop-blur-sm`}>
                        <div className={`w-2 h-2 rounded-full ${estadoConfig.color} animate-pulse`}></div>
                        <span className="text-white text-xs font-semibold">{estadoConfig.text}</span>
                      </div>
                    </div>
                    
                    {/* Flyer Image */}
                    <div className="relative aspect-[3/4] overflow-hidden" style={{height: '650px'}}>
                      <img
                        src={evento.flyerUrl}
                        alt={evento.titulo}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  
                    {/* Event Info */}
                    <div className="p-6 bg-white">
                      <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {evento.titulo}
                      </h3>
                      
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                          </svg>
                          <span className="font-medium">{formatearFecha(evento.fecha)}</span>
                        </div>
                        
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          <span className="line-clamp-1">{evento.lugar}</span>
                        </div>
                      </div>
                      
                      {/* Call to Action */}
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-400">
                            No disponible
                          </span>
                          <svg className="w-4 h-4 transition-all text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Link href={`/conciertos/${evento.slug}`}>
                  <div className="group cursor-pointer">
                    <div className="relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105">
                      {/* Estado Indicator */}
                      <div className="absolute top-4 right-4 z-10">
                        <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${estadoConfig.color} ${estadoConfig.glow} shadow-lg backdrop-blur-sm`}>
                          <div className={`w-2 h-2 rounded-full ${estadoConfig.color} animate-pulse`}></div>
                          <span className="text-white text-xs font-semibold">{estadoConfig.text}</span>
                        </div>
                      </div>
                      
                      {/* Flyer Image */}
                      <div className="relative aspect-[3/4] overflow-hidden" style={{height: '650px'}}>
                        <img
                          src={evento.flyerUrl}
                          alt={evento.titulo}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    
                      {/* Event Info */}
                      <div className="p-6 bg-white">
                        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {evento.titulo}
                        </h3>
                        
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center">
                            <svg className="w-4 h-4 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                            </svg>
                            <span className="font-medium">{formatearFecha(evento.fecha)}</span>
                          </div>
                          
                          <div className="flex items-center">
                            <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            <span className="line-clamp-1">{evento.lugar}</span>
                          </div>
                        </div>
                        
                        {/* Call to Action */}
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-blue-600 group-hover:text-blue-800 transition-colors">
                              Ver detalles
                            </span>
                            <svg className="w-4 h-4 transition-all text-blue-600 group-hover:text-blue-800 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              )}
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}

export default ConciertosCarousel