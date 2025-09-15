'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import NavBar from './NavBar';
import ComunasSection from './ComunasSection';
import CotizadorAeropuerto from './CotizadorAeropuerto';

const HeroSection = () => {
  const [comunaSeleccionada, setComunaSeleccionada] = useState<string>('');
  return (
    <section className="relative h-screen flex flex-col">
      {/* NavBar */}
      <NavBar />
      
      {/* Hero Content */}
      <div className="flex-1 relative flex items-center justify-center text-white">
        {/* Imagen de fondo */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/bg-airport.jpg"
            alt="Aeropuerto background"
            fill
            className="object-cover object-center w-full h-full"
            priority
            sizes="100vw"
          />
        </div>
        
        {/* Overlay con gradiente para mejor legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70 z-10"></div>
        
        {/* Contenido principal */}
        <div className="container mx-auto px-6 z-20 py-24">
          {/* Título centrado */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 text-shadow-lg">
              Tu Viaje, Tu Experiencia, Nuestra Promesa.
            </h1>
          </div>
          
          {/* Cotizador de Aeropuerto */}
          <div className="max-w-4xl mx-auto">
            <CotizadorAeropuerto comunaSeleccionada={comunaSeleccionada} />
          </div>
          
          {/* Carrusel de Comunas integrado */}
          <div className="mt-16">
            <ComunasSection onComunaSelect={setComunaSeleccionada} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;