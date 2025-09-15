import React from 'react';
import Image from 'next/image';

const VehiculosSection = () => {
  return (
    <section className="min-h-screen py-16 bg-gray-900 text-white relative overflow-hidden">
      {/* Imagen de fondo del aeropuerto */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/aeropuerto.png"
          alt="Aeropuerto background"
          fill
          className="object-cover opacity-100 w-full h-full"
          sizes="100vw"
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          El Vehículo Perfecto para Cada Ocasión
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Peugeot Traveller */}
          <div className="bg-gray-800/30 rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4 text-isavan-green">
              Peugeot Traveller: Confort y Espacio para tu Grupo
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Ideal para familias, grupos de amigos y equipos de trabajo. Nuestra van 
              Peugeot Traveller es la definición de un viaje cómodo y sin compromisos. 
              Con un interior espacioso y un ambiente relajante, es la opción perfecta para 
              quienes viajan juntos, ya sea al aeropuerto con todo el equipaje o a un 
              concierto para empezar a vivir la experiencia desde el camino.
            </p>
            <div className="bg-isavan-green/20 rounded-lg p-4">
              <p className="text-isavan-green font-semibold">
                <strong>Capacidad ideal:</strong> Hasta 8 pasajeros.
              </p>
            </div>
          </div>
          
          {/* Peugeot 308 */}
          <div className="bg-gray-800/30 rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4 text-isavan-green">
              Peugeot 308: Agilidad y Discreción Ejecutiva
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Perfecto para viajeros de negocios, parejas o pasajeros que buscan un 
              servicio más personal y ágil. Nuestro Peugeot 308 Feline ofrece la 
              elegancia y el confort de un auto de alta gama, con la perfección necesaria 
              para tus reuniones o traslados urbanos. Su agilidad lo convierte en la mejor 
              opción para moverse eficientemente por la ciudad y llegar a tu destino con 
              estilo.
            </p>
            <div className="bg-isavan-green/20 rounded-lg p-4">
              <p className="text-isavan-green font-semibold">
                <strong>Capacidad ideal:</strong> Hasta 4 pasajeros.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VehiculosSection;