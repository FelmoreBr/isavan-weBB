'use client'

import React, { useState } from 'react'
import Flatpickr from 'react-flatpickr'
import 'flatpickr/dist/themes/material_blue.css'

interface Props {
  comunas: string[]
}

const Cotizador: React.FC<Props> = ({ comunas }) => {
  const [formData, setFormData] = useState({
    comuna: '',
    pasajeros: '',
    fecha: new Date(),
    hora: new Date(),
    vehiculo: ''
  })
  const [error, setError] = useState('')
  const [showModal, setShowModal] = useState(false)

  const handleInputChange = (field: string, value: string | Date) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    if (error) setError('')
  }

  const validateForm = () => {
    if (!formData.comuna) {
      setError('Por favor selecciona una comuna')
      return false
    }
    if (!formData.pasajeros) {
      setError('Por favor selecciona el número de pasajeros')
      return false
    }
    if (!formData.fecha) {
      setError('Por favor selecciona una fecha')
      return false
    }
    if (!formData.hora) {
      setError('Por favor selecciona una hora')
      return false
    }
    if (!formData.vehiculo) {
      setError('Por favor selecciona el tipo de vehículo')
      return false
    }
    return true
  }

  const calcularPrecio = () => {
    let precio = 0
    switch (formData.pasajeros) {
      case '1-4':
        precio = 110000
        break
      case '5-7':
        precio = 130000
        break
      case '8-9':
        precio = 150000
        break
    }
    return precio
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setShowModal(true)
  }

  const handleWhatsAppContact = () => {
    const fechaFormateada = formData.fecha.toLocaleDateString('es-CL', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })

    const horaFormateada = formData.hora.toLocaleTimeString('es-CL', {
      hour: '2-digit',
      minute: '2-digit'
    })

    const precio = calcularPrecio()
    const precioFormateado = `$${precio.toLocaleString('es-CL')}`

    const mensaje = `¡Hola! Me gustaría confirmar mi cotización:

🚗 Traslado al Aeropuerto
📍 Comuna: ${formData.comuna}
👥 Pasajeros: ${formData.pasajeros}
📅 Fecha: ${fechaFormateada}
🕐 Hora: ${horaFormateada}
🚙 Vehículo: ${formData.vehiculo}
💰 Total Aproximado: ${precioFormateado}

Por favor, contáctame para confirmar disponibilidad y precio.`

    const mensajeCodificado = encodeURIComponent(mensaje)
    const urlWhatsApp = `https://wa.me/56984513302?text=${mensajeCodificado}`
    
    window.open(urlWhatsApp, '_blank')
    setShowModal(false)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Cotizar Viaje
      </h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Comuna */}
        <div>
          <label htmlFor="comuna" className="block text-sm font-medium text-gray-700 mb-2">
            Comuna
          </label>
          <select
            id="comuna"
            value={formData.comuna}
            onChange={(e) => handleInputChange('comuna', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Selecciona una comuna</option>
            {comunas.map((comuna, index) => (
              <option key={index} value={comuna}>
                {comuna}
              </option>
            ))}
          </select>
        </div>

        {/* Número de pasajeros */}
        <div>
          <label htmlFor="pasajeros" className="block text-sm font-medium text-gray-700 mb-2">
            Nº de Pasajeros
          </label>
          <select
            value={formData.pasajeros}
            onChange={(e) => handleInputChange('pasajeros', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Selecciona cantidad</option>
            <option value="1-4">1-4 pasajeros (Auto)</option>
            <option value="5-7">5-7 pasajeros (Van)</option>
            <option value="8-9">8-9 pasajeros (Van)</option>
          </select>
        </div>

        {/* Fecha */}
        <div>
          <label htmlFor="fecha" className="block text-sm font-medium text-gray-700 mb-2">
            Fecha
          </label>
          <Flatpickr
            value={formData.fecha}
            onChange={(date) => handleInputChange('fecha', date[0])}
            options={{
              dateFormat: 'd/m/Y',
              minDate: 'today',
              locale: {
                firstDayOfWeek: 1,
                weekdays: {
                  shorthand: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
                  longhand: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
                },
                months: {
                  shorthand: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                  longhand: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
                }
              }
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Selecciona fecha"
          />
        </div>

        {/* Hora */}
        <div>
          <label htmlFor="hora" className="block text-sm font-medium text-gray-700 mb-2">
            Hora
          </label>
          <Flatpickr
            value={formData.hora}
            onChange={(date) => handleInputChange('hora', date[0])}
            options={{
              enableTime: true,
              noCalendar: true,
              dateFormat: 'H:i',
              time_24hr: true,
              defaultHour: 8,
              defaultMinute: 0
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Selecciona hora"
          />
        </div>

        {/* Tipo de vehículo */}
        <div>
          <label htmlFor="vehiculo" className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de Vehículo
          </label>
          <select
            id="vehiculo"
            value={formData.vehiculo}
            onChange={(e) => handleInputChange('vehiculo', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Selecciona vehículo</option>
            <option value="Auto">Auto</option>
            <option value="Van">Van</option>
          </select>
        </div>

        {/* Botón de envío */}
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          Cotizar Ahora
        </button>
      </form>

      {/* Modal de Cotización */}
      {showModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          style={{ zIndex: 99999 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowModal(false)
            }
          }}
        >
          <div 
            className="bg-white p-6 rounded-lg shadow-xl max-w-md w-11/12 mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-blue-600 text-center text-xl font-bold mb-5">Resumen de tu Cotización</h3>
            
            <div className="space-y-3 mb-6">
               <div className="flex justify-between">
                 <span className="font-semibold text-gray-700">Comuna:</span>
                 <span className="text-gray-900">{formData.comuna}</span>
               </div>
               <div className="flex justify-between">
                 <span className="font-semibold text-gray-700">Pasajeros:</span>
                 <span className="text-gray-900">{formData.pasajeros}</span>
               </div>
               <div className="flex justify-between">
                 <span className="font-semibold text-gray-700">Fecha:</span>
                 <span className="text-gray-900">{formData.fecha.toLocaleDateString('es-CL')}</span>
               </div>
               <div className="flex justify-between">
                 <span className="font-semibold text-gray-700">Hora:</span>
                 <span className="text-gray-900">{formData.hora.toLocaleTimeString('es-CL', {hour: '2-digit', minute: '2-digit'})}</span>
               </div>
               <div className="flex justify-between">
                 <span className="font-semibold text-gray-700">Vehículo:</span>
                 <span className="text-gray-900">{formData.vehiculo}</span>
               </div>
             </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="text-center">
                <span className="text-lg font-bold text-green-700">
                  Total Aproximado: ${calcularPrecio().toLocaleString('es-CL')}
                </span>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={handleWhatsAppContact}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              >
                📱 Agendar por WhatsApp
              </button>
              
              <button 
                onClick={() => setShowModal(false)}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cotizador