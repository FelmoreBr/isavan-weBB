import { defineType } from 'sanity'

export const vehiculoType = defineType({
  name: 'vehiculo',
  title: 'Vehículos',
  type: 'document',
  fields: [
    {
      name: 'modelo',
      title: 'Modelo',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'modelo',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'capacidad',
      title: 'Capacidad',
      type: 'number',
    },
    {
      name: 'descripcion',
      title: 'Descripción',
      type: 'text',
    },
    {
      name: 'imagen',
      title: 'Imagen',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'caracteristicas',
      title: 'Características',
      type: 'array',
      of: [{ type: 'string' }],
    },
  ],
  preview: {
    select: {
      title: 'modelo',
      media: 'imagen',
    },
  },
})