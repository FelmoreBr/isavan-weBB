interface WhatsAppPayload {
  origen: string
  pasajeros: number
  fecha: string
  hora: string
  vehiculo: string
  notas?: string
}

export function buildWhatsAppUrl(phone: string, payload: WhatsAppPayload): string {
  const { origen, pasajeros, fecha, hora, vehiculo, notas } = payload
  
  let mensaje = `¡Hola! Me gustaría solicitar un servicio de transporte con los siguientes detalles:\n\n`
  mensaje += `📍 Origen: ${origen}\n`
  mensaje += `👥 Pasajeros: ${pasajeros}\n`
  mensaje += `📅 Fecha: ${fecha}\n`
  mensaje += `🕐 Hora: ${hora}\n`
  mensaje += `🚐 Vehículo: ${vehiculo}\n`
  
  if (notas) {
    mensaje += `📝 Notas adicionales: ${notas}\n`
  }
  
  mensaje += `\n¿Podrían confirmarme disponibilidad y tarifa? ¡Gracias!`
  
  const encodedMessage = encodeURIComponent(mensaje)
  return `https://wa.me/${phone}?text=${encodedMessage}`
}

// Función auxiliar para formatear fecha
export function formatDate(date: Date): string {
  return date.toLocaleDateString('es-CL', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Función auxiliar para formatear hora
export function formatTime(time: string): string {
  return time
}

// Función para enviar mensaje a WhatsApp
export function enviarWhatsApp(mensaje: string): void {
  const numeroWhatsApp = '56984513302' // Número sin el + inicial
  const mensajeCodificado = encodeURIComponent(mensaje)
  const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`
  
  window.open(urlWhatsApp, '_blank')
}