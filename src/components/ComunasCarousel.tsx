'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import Link from 'next/link'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

interface ComunaItem {
  nombre: string
  imagenUrl: string
  slug?: string
}

interface Props {
  items: ComunaItem[]
}

const ComunasCarousel: React.FC<Props> = ({ items }) => {
  return (
    <div className="w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
        }}
        className="comunas-carousel"
      >
        {items.map((item, index) => {
          const slideContent = (
            <div className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="aspect-w-16 aspect-h-12 relative">
                <img
                  src={item.imagenUrl}
                  alt={item.nombre}
                  loading="lazy"
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white text-lg font-semibold text-center drop-shadow-lg">
                    {item.nombre}
                  </h3>
                </div>
              </div>
            </div>
          )

          return (
            <SwiperSlide key={index}>
              {item.slug ? (
                <Link href={`/comunas/${item.slug}`}>
                  {slideContent}
                </Link>
              ) : (
                slideContent
              )}
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}

export default ComunasCarousel