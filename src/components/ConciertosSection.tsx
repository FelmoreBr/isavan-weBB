'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
// Reemplazamos los iconos problemáticos con SVG simples

const ConciertosSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  const conciertos = [
    {
      id: 1,
      nombre: "Oasis",
      fecha: "10 Mayo 2024",
      lugar: "Estadio San Carlos",
      fechaCompleta: "03 y 04 de Diciembre - Estadio Nacional",
      imagen: "/images/Flayer/OASIS.png"
    },
    {
      id: 2,
      nombre: "Dua Lipa",
      fecha: "15 Junio 2024",
      lugar: "Movistar Arena",
      fechaCompleta: "15 de Junio - Movistar Arena",
      imagen: "/images/Flayer/dua lipa.png"
    },
    {
      id: 3,
      nombre: "Green Day",
      fecha: "20 Julio 2024",
      lugar: "Estadio Nacional",
      fechaCompleta: "20 de Julio - Estadio Nacional",
      imagen: "/images/Flayer/green day.png"
    },
    {
      id: 4,
      nombre: "Linkin Park",
      fecha: "25 Agosto 2024",
      lugar: "Estadio San Carlos",
      fechaCompleta: "25 de Agosto - Estadio San Carlos",
      imagen: "/images/Flayer/link park.png"
    },
    {
      id: 5,
      nombre: "Katy Perry",
      fecha: "10 Septiembre 2024",
      lugar: "Movistar Arena",
      fechaCompleta: "10 de Septiembre - Movistar Arena",
      imagen: "/images/Flayer/KATY.png"
    }
  ];

  // Autoplay effect
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === conciertos.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Cambia cada 4 segundos
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, conciertos.length]);

  const nextSlide = () => {
    setIsAutoPlaying(false); // Pausa autoplay al interactuar
    setCurrentIndex((prevIndex) => 
      prevIndex === conciertos.length - 1 ? 0 : prevIndex + 1
    );
    // Reactiva autoplay después de 10 segundos
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false); // Pausa autoplay al interactuar
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? conciertos.length - 1 : prevIndex - 1
    );
    // Reactiva autoplay después de 10 segundos
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false); // Pausa autoplay al interactuar
    setCurrentIndex(index);
    // Reactiva autoplay después de 10 segundos
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section className="py-16 bg-gray-900 text-white relative overflow-hidden">
      {/* Imagen de fondo del aeropuerto */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/Concierto.png"
          alt="Concierto background"
          fill
          className="object-cover opacity-100"
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Próximos Conciertos
        </h2>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Carrusel principal */}
          <div className="relative h-[500px] md:h-[700px] overflow-hidden rounded-lg" style={{perspective: '1000px'}}>
            {conciertos.map((concierto, index) => (
              <div
                key={concierto.id}
                className={`absolute inset-0 transition-all duration-700 ease-in-out`}
                style={{
                  transform: index === currentIndex 
                    ? 'rotateY(0deg) scale(1)' 
                    : index < currentIndex 
                    ? 'rotateY(-90deg) scale(0.8)' 
                    : 'rotateY(90deg) scale(0.8)',
                  opacity: index === currentIndex ? 1 : 0,
                  transformOrigin: 'center',
                  backfaceVisibility: 'hidden'
                }}
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="relative w-[520px] h-full max-h-[650px]">
                    <Image
                      src={concierto.imagen}
                      alt={`Flayer ${concierto.nombre}`}
                      fill
                      className="object-contain rounded-lg shadow-2xl"
                    />
                  </div>
                  
                  {/* Información del concierto */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 rounded-lg p-4 text-center">
                    <h3 className="text-xl font-bold text-isavan-green mb-1">
                      {concierto.nombre}
                    </h3>
                    <p className="text-sm text-gray-300">
                      {concierto.fechaCompleta}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Botones de navegación */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-isavan-green/80 hover:bg-isavan-green text-white p-2 rounded-full transition-colors duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-isavan-green/80 hover:bg-isavan-green text-white p-2 rounded-full transition-colors duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          {/* Indicadores */}
          <div className="flex justify-center mt-6 space-x-2">
            {conciertos.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === currentIndex ? 'bg-isavan-green' : 'bg-gray-600 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConciertosSection;