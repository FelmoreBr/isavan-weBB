import { defineType } from 'sanity'

export const conciertoType = defineType({
  name: 'concierto',
  title: 'Conciertos',
  type: 'document',
  fields: [
    {
      name: 'titulo',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'titulo',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'fecha',
      title: 'Fecha',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'lugar',
      title: 'Lugar',
      type: 'string',
    },
    {
      name: 'flyer',
      title: 'Flyer',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'descripcion',
      title: 'Descripción corta',
      type: 'text',
    },
    {
      name: 'contenido',
      title: 'Contenido',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'estado',
      title: 'Estado de Disponibilidad',
      type: 'string',
      options: {
        list: [
          { title: 'Disponible', value: 'disponible' },
          { title: 'Últimos Cupos', value: 'ultimos-cupos' },
          { title: 'Agotado', value: 'agotado' },
        ],
        layout: 'radio',
      },
      initialValue: 'disponible',
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'titulo',
      media: 'flyer',
    },
  },
})