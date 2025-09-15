import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import {conciertoType} from './conciertoType'
import {vehiculoType} from './vehiculoType'
import {comunaType} from './comunaType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType, postType, authorType, conciertoType, vehiculoType, comunaType],
}
