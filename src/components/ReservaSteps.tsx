import React from 'react';

const ReservaSteps = () => {
  const steps = [
    {
      number: 1,
      title: "Cotiza y Elige",
      description: "Selecciona tu destino (Aeropuerto o Concierto) y obtén una tarifa clara al instante."
    },
    {
      number: 2,
      title: "Agenda tu Fecha",
      description: "Indicanos el día, la hora y el punto de recogida en la V Región."
    },
    {
      number: 3,
      title: "Confirma y Relájate",
      description: "Recibe tu confirmación y deja que nosotros nos encarguemos del resto. ¡Así de fácil!"
    }
  ];

  return (
    <section className="py-16 bg-black text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Reserva tu Viaje en 3 Simples Pasos.
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              {/* Número del paso */}
              <div className="w-16 h-16 bg-isavan-green rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-6">
                {step.number}
              </div>
              
              {/* Contenido del paso */}
              <div className="bg-gray-800 rounded-lg p-6 h-40 flex flex-col justify-center">
                <h3 className="text-xl font-semibold mb-3 text-white">
                  {step.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReservaSteps;