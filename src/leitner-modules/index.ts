import { ELEMENTS_MODULE } from './elements'
import { MAJOR_ARCANA_MODULE } from './major-arcana'
import { SUITS_MODULE } from './suits'
import { ILeitnerModule } from './types'

export type AllModuleTypes =
  | typeof ELEMENTS_MODULE.metadata.key
  | typeof MAJOR_ARCANA_MODULE.metadata.key
  | typeof SUITS_MODULE.metadata.key

export const allModules: ILeitnerModule<AllModuleTypes>[] = [
  ELEMENTS_MODULE,
  MAJOR_ARCANA_MODULE,
  SUITS_MODULE,
]
