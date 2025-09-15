import { defineType } from 'sanity'

export const comunaType = defineType({
  name: 'comuna',
  title: 'Comuna',
  type: 'document',
  fields: [
    {
      name: 'nombre',
      title: 'Nombre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'nombre',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
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
      name: 'descripcion',
      title: 'Descripción',
      type: 'text',
    },
    {
      name: 'orden',
      title: 'Orden',
      type: 'number',
    },
  ],
  preview: {
    select: {
      title: 'nombre',
      media: 'imagen',
    },
  },
})