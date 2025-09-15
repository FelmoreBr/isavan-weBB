'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
// Reemplazamos los iconos problemáticos con SVG simples

interface ComunasSectionProps {
  onComunaSelect?: (comuna: string) => void;
}

const ComunasSection: React.FC<ComunasSectionProps> = ({ onComunaSelect }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  const comunas = [
    {
      nombre: 'La Cruz',
      imagen: '/images/comuna_la-cruz.png'
    },
    {
      nombre: 'Limache',
      imagen: '/images/comuna_limache.png'
    },
    {
      nombre: 'Olmué',
      imagen: '/images/comuna_olmue.png'
    },
    {
      nombre: 'Viña del Mar',
      imagen: '/images/comuna_vina-del-mar.png'
    },
    {
      nombre: 'Concón',
      imagen: '/images/comuna_concon.png'
    },
    {
      nombre: 'Quillota',
      imagen: '/images/comuna_quillota.png'
    },
    {
      nombre: 'Quilpué',
      imagen: '/images/comuna_quilpue.png'
    },
    {
      nombre: 'Villa Alemana',
      imagen: '/images/comuna_villa-alemana.png'
    }
  ];

  // Autoplay functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex >= comunas.length - 3 ? 0 : prevIndex + 1
      );
    }, 3000); // Cambia cada 3 segundos

    return () => clearInterval(interval);
  }, [isAutoPlaying, comunas.length]);

  const nextSlide = () => {
    setIsAutoPlaying(false); // Pausa autoplay cuando el usuario interactúa
    setCurrentIndex((prevIndex) => 
      prevIndex >= comunas.length - 3 ? 0 : prevIndex + 1
    );
    // Reactiva autoplay después de 5 segundos
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false); // Pausa autoplay cuando el usuario interactúa
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? comunas.length - 3 : prevIndex - 1
    );
    // Reactiva autoplay después de 5 segundos
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const handleComunaClick = (comunaNombre: string) => {
    if (onComunaSelect) {
      onComunaSelect(comunaNombre);
    }
  };

  return (
    <section className="py-8 text-white relative">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Nuestras Comunas
        </h2>
        
        <div className="relative max-w-6xl mx-auto">
          <div className="overflow-hidden rounded-lg">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
            >
              {comunas.map((comuna, index) => (
                <div key={index} className="w-1/3 flex-shrink-0 px-3">
                  <div 
                    className="rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-105 shadow-xl cursor-pointer"
                    onClick={() => handleComunaClick(comuna.nombre)}
                  >
                    <div className="relative h-48">
                      <Image
                        src={comuna.imagen}
                        alt={comuna.nombre}
                        fill
                        className="object-cover rounded-t-lg"
                      />
                      {/* Overlay con nombre */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end hover:from-black/50 transition-all duration-300">
                        <h3 className="text-lg font-bold text-white p-4 w-full text-center">
                          {comuna.nombre}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Botones de navegación */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-isavan-green/80 hover:bg-isavan-green text-white p-3 rounded-full transition-colors duration-200 shadow-lg z-10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-isavan-green/80 hover:bg-isavan-green text-white p-3 rounded-full transition-colors duration-200 shadow-lg z-10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          {/* Indicadores */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: Math.ceil(comunas.length / 3) }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentIndex(index);
                  setTimeout(() => setIsAutoPlaying(true), 5000);
                }}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  Math.floor(currentIndex / 3) === index ? 'bg-isavan-green' : 'bg-gray-600 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComunasSection;