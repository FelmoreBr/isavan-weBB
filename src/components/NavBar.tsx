'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className="fixed w-full top-0 left-0 z-40 bg-transparent">
      <nav className="container mx-auto px-6 py-6 flex justify-between items-center">
        <div>
          <Image 
            src="/images/logo.png" 
            alt="Logo Isavan" 
            width={128} 
            height={128} 
            className="h-32 w-auto"
            priority
          />
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          <Link href="#hero" className="text-white hover:text-green-400 transition-colors duration-300 font-semibold">
            Inicio
          </Link>
          <Link href="#servicios" className="text-white hover:text-green-400 transition-colors duration-300 font-semibold">
            Vehículos
          </Link>
          <Link href="/conciertos" className="text-white hover:text-green-400 transition-colors duration-300 font-semibold">
            Conciertos
          </Link>
          <Link href="#servicios" className="text-white hover:text-green-400 transition-colors duration-300 font-semibold">
            Servicios
          </Link>
          <Link href="#contacto" className="text-white hover:text-green-400 transition-colors duration-300 font-semibold">
            Contacto
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </nav>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/90 z-40 flex flex-col items-center justify-center md:hidden">
          <div className="absolute top-6 right-6">
            <button onClick={toggleMobileMenu} className="text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <Link href="#hero" className="text-white text-xl font-semibold py-3 hover:text-green-400 transition-colors" onClick={toggleMobileMenu}>
            Inicio
          </Link>
          <Link href="#servicios" className="text-white text-xl font-semibold py-3 hover:text-green-400 transition-colors" onClick={toggleMobileMenu}>
            Servicios
          </Link>
          <Link href="/conciertos" className="text-white text-xl font-semibold py-3 hover:text-green-400 transition-colors" onClick={toggleMobileMenu}>
            Conciertos
          </Link>
          <Link href="#contacto" className="text-white text-xl font-semibold py-3 hover:text-green-400 transition-colors" onClick={toggleMobileMenu}>
            Contacto
          </Link>
        </div>
      )}
    </header>
  )
}

export default NavBar