"use client"

import React from "react"
import { CardSwipe } from "./ui/card-swipe"

const CardSwipeDemo = () => {
  const images = [
    { src: "/images/Flayer/KATY.png", alt: "Katy Perry" },
    { src: "/images/Flayer/LAMHE.png", alt: "LAMHE" },
    { src: "/images/Flayer/OASIS.png", alt: "Oasis" },
    { src: "/images/Flayer/ROSE.png", alt: "Rose" },
    { src: "/images/Flayer/dua lipa.png", alt: "Dua Lipa" },
    { src: "/images/Flayer/green day.png", alt: "Green Day" },
    { src: "/images/Flayer/link park.png", alt: "Linkin Park" },
  ]

  return (
    <div className="w-full">
      <CardSwipe images={images} autoplayDelay={2000} slideShadows={false} />
    </div>
  )
}

export default CardSwipeDemo