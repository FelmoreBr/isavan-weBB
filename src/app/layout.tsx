import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Isavan | Traslados Seguros al Aeropuerto SCL desde la V Región",
  description: "Reserva tu traslado privado al aeropuerto SCL desde Viña del Mar, Valparaíso y más. Vans de lujo, servicio 24/7 y atención personalizada. ¡Cotiza online!",
  keywords: "traslados aeropuerto, van aeropuerto, santiago, viña del mar, valparaiso, concon, quilpue, isavan",
  authors: [{ name: "Isavan" }],
  openGraph: {
    title: "Isavan | Traslados Seguros al Aeropuerto SCL",
    description: "Reserva tu traslado privado al aeropuerto SCL desde Viña del Mar, Valparaíso y más.",
    locale: "es_CL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${inter.variable} font-sans antialiased`}
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        {children}
      </body>
    </html>
  );
}
