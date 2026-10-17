import {
  buildMultipleStringOptions,
  buildSingleStringOptions,
} from 'src/utils/functions/logicUtils'
import { RESPUESTAS_COMUNES } from './respuestas-comunes'
import type { ILeitnerModule } from './types'

const { principios, elementos, arcanos_mayores } = RESPUESTAS_COMUNES

const elementOptions = [
  elementos.fire,
  elementos.air,
  elementos.water,
  elementos.earth,
]

const ALL_ARCHETYPES = Object.values(arcanos_mayores).map((e) => e.arquetipo)
const ALL_VISUAL = Object.values(arcanos_mayores).map((e) => e.anclaVisual)
const ALL_UPRIGHT = Object.values(arcanos_mayores).map(
  (e) => e.keywords.upright,
)
const ALL_REVERSED = Object.values(arcanos_mayores).map(
  (e) => e.keywords.reversed,
)

export const MAJOR_ARCANA_MODULE: ILeitnerModule<'major-arcana'> = {
  metadata: {
    title: 'Arcanos Mayores',
    icon: 'boxicons:book-library-filled',
    key: 'major-arcana',
    sortKey: 'key',
  },
  facts: [
    // 0
    {
      moduleType: 'major-arcana',
      key: '00',
      title: 'El Loco / The Fool',
      hint: 'El arcano El Loco representa ...',
      quiz: [
        {
          question: 'Numero o posición',
          answer: '0',
          quizType: 'input-text',
          options: null,
        },
        {
          question: 'Principio energético',
          answer: principios.yang,
          quizType: 'multi-choice',
          options: [principios.yang, principios.yin],
        },
        {
          question: 'Elemento',
          answer: elementos.air,
          quizType: 'pool-select',
          options: elementOptions,
        },
        {
          question: 'Ancla visual',
          answer: arcanos_mayores['00'].anclaVisual,
          options: buildSingleStringOptions(
            arcanos_mayores['00'].anclaVisual,
            ALL_VISUAL,
            8,
          ),
          quizType: 'pool-select',
          autocompleteLength: 10,
        },
        {
          question: 'Arquetipo',
          answer: arcanos_mayores['00'].arquetipo,
          options: buildSingleStringOptions(
            arcanos_mayores['00'].arquetipo,
            ALL_ARCHETYPES,
            8,
          ),
          quizType: 'pool-select',
          autocompleteLength: 12,
        },
        {
          question: 'Asociaciones al derecho',
          answer: null,
          answers: arcanos_mayores['00'].keywords.upright,
          quizType: 'pool-select-multiple',
          options: buildMultipleStringOptions(
            arcanos_mayores['00'].keywords.upright,
            ALL_UPRIGHT,
            arcanos_mayores['00'].keywords.upright.length * 4,
          ),
        },
        {
          question: 'Asociaciones al revés',
          answer: null,
          answers: arcanos_mayores['00'].keywords.reversed,
          quizType: 'pool-select-multiple',
          options: buildMultipleStringOptions(
            arcanos_mayores['00'].keywords.reversed,
            ALL_REVERSED,
            arcanos_mayores['00'].keywords.reversed.length * 2,
          ),
          autocompleteLength: 2,
        },
      ],
    },
    // 1
    {
      moduleType: 'major-arcana',
      key: '01',
      title: 'El Mago / The Magician',
      hint: 'El arcano El Mago representa ...',
      quiz: [
        {
          question: 'Numero o posición',
          answer: '1',
          quizType: 'input-text',
          options: null,
        },
        {
          question: 'Principio energético',
          answer: principios.yin,
          quizType: 'multi-choice',
          options: [principios.yang, principios.yin],
        },
        {
          question: 'Elemento',
          answer: elementos.earth,
          quizType: 'pool-select',
          options: elementOptions,
        },
        {
          question: 'Ancla visual',
          answer: arcanos_mayores['01'].anclaVisual,
          options: buildSingleStringOptions(
            arcanos_mayores['01'].anclaVisual,
            ALL_VISUAL,
            8,
          ),
          quizType: 'pool-select',
          autocompleteLength: 10,
        },
        {
          question: 'Arquetipo',
          answer: arcanos_mayores['01'].arquetipo,
          options: buildSingleStringOptions(
            arcanos_mayores['01'].arquetipo,
            ALL_ARCHETYPES,
            8,
          ),
          quizType: 'pool-select',
          autocompleteLength: 12,
        },
        {
          question: 'Asociaciones al derecho',
          answer: null,
          answers: arcanos_mayores['01'].keywords.upright,
          quizType: 'pool-select-multiple',
          options: buildMultipleStringOptions(
            arcanos_mayores['01'].keywords.upright,
            ALL_UPRIGHT,
            arcanos_mayores['01'].keywords.upright.length * 4,
          ),
        },
        {
          question: 'Asociaciones al revés',
          answer: null,
          answers: arcanos_mayores['01'].keywords.reversed,
          quizType: 'pool-select-multiple',
          options: buildMultipleStringOptions(
            arcanos_mayores['01'].keywords.reversed,
            ALL_REVERSED,
            arcanos_mayores['01'].keywords.reversed.length * 2,
          ),
          autocompleteLength: 2,
        },
      ],
    },
    // 2
    {
      moduleType: 'major-arcana',
      key: '02',
      title: 'La Sacerdotisa / The High Priestess',
      hint: 'El arcano La Sacerdotisa representa ...',
      quiz: [
        {
          question: 'Numero o posición',
          answer: '2',
          quizType: 'input-text',
          options: null,
        },
        {
          question: 'Principio energético',
          answer: principios.yin,
          quizType: 'multi-choice',
          options: [principios.yang, principios.yin],
        },
        {
          question: 'Elemento',
          answer: elementos.water,
          quizType: 'pool-select',
          options: elementOptions,
        },
        {
          question: 'Ancla visual',
          answer: arcanos_mayores['02'].anclaVisual,
          options: buildSingleStringOptions(
            arcanos_mayores['02'].anclaVisual,
            ALL_VISUAL,
            8,
          ),
          quizType: 'pool-select',
          autocompleteLength: 10,
        },
        {
          question: 'Arquetipo',
          answer: arcanos_mayores['02'].arquetipo,
          options: buildSingleStringOptions(
            arcanos_mayores['02'].arquetipo,
            ALL_ARCHETYPES,
            8,
          ),
          quizType: 'pool-select',
          autocompleteLength: 12,
        },
        {
          question: 'Asociaciones al derecho',
          answer: null,
          answers: arcanos_mayores['02'].keywords.upright,
          quizType: 'pool-select-multiple',
          options: buildMultipleStringOptions(
            arcanos_mayores['02'].keywords.upright,
            ALL_UPRIGHT,
            arcanos_mayores['02'].keywords.upright.length * 4,
          ),
        },
        {
          question: 'Asociaciones al revés',
          answer: null,
          answers: arcanos_mayores['02'].keywords.reversed,
          quizType: 'pool-select-multiple',
          options: buildMultipleStringOptions(
            arcanos_mayores['02'].keywords.reversed,
            ALL_REVERSED,
            arcanos_mayores['02'].keywords.reversed.length * 2,
          ),
          autocompleteLength: 2,
        },
      ],
    },
    // 3
    {
      moduleType: 'major-arcana',
      key: '03',
      title: 'La Emperatriz / The Empress',
      hint: 'El arcano La Emperatriz representa ...',
      quiz: [
        {
          question: 'Numero o posición',
          answer: '3',
          quizType: 'input-text',
          options: null,
        },
        {
          question: 'Principio energético',
          answer: principios.yin,
          quizType: 'multi-choice',
          options: [principios.yang, principios.yin],
        },
        {
          question: 'Elemento',
          answer: elementos.earth,
          quizType: 'pool-select',
          options: elementOptions,
        },
        {
          question: 'Ancla visual',
          answer: arcanos_mayores['03'].anclaVisual,
          options: buildSingleStringOptions(
            arcanos_mayores['03'].anclaVisual,
            ALL_VISUAL,
            8,
          ),
          quizType: 'pool-select',
          autocompleteLength: 10,
        },
        {
          question: 'Arquetipo',
          answer: arcanos_mayores['03'].arquetipo,
          options: buildSingleStringOptions(
            arcanos_mayores['03'].arquetipo,
            ALL_ARCHETYPES,
            8,
          ),
          quizType: 'pool-select',
          autocompleteLength: 12,
        },
        {
          question: 'Asociaciones al derecho',
          answer: null,
          answers: arcanos_mayores['03'].keywords.upright,
          quizType: 'pool-select-multiple',
          options: buildMultipleStringOptions(
            arcanos_mayores['03'].keywords.upright,
            ALL_UPRIGHT,
            arcanos_mayores['03'].keywords.upright.length * 4,
          ),
        },
        {
          question: 'Asociaciones al revés',
          answer: null,
          answers: arcanos_mayores['03'].keywords.reversed,
          quizType: 'pool-select-multiple',
          options: buildMultipleStringOptions(
            arcanos_mayores['03'].keywords.reversed,
            ALL_REVERSED,
            arcanos_mayores['03'].keywords.reversed.length * 2,
          ),
          autocompleteLength: 2,
        },
      ],
    },
    // 4
    {
      moduleType: 'major-arcana',
      key: '04',
      title: 'El Emperador / The Emperor',
      hint: 'El arcano El Emperador representa ...',
      quiz: [
        {
          question: 'Numero o posición',
          answer: '4',
          quizType: 'input-text',
          options: null,
        },
        {
          question: 'Principio energético',
          answer: principios.yang,
          quizType: 'multi-choice',
          options: [principios.yang, principios.yin],
        },
        {
          question: 'Elemento',
          answer: elementos.fire,
          quizType: 'pool-select',
          options: elementOptions,
        },
        {
          question: 'Ancla visual',
          answer: arcanos_mayores['04'].anclaVisual,
          options: buildSingleStringOptions(
            arcanos_mayores['04'].anclaVisual,
            ALL_VISUAL,
            8,
          ),
          quizType: 'pool-select',
          autocompleteLength: 10,
        },
        {
          question: 'Arquetipo',
          answer: arcanos_mayores['04'].arquetipo,
          options: buildSingleStringOptions(
            arcanos_mayores['04'].arquetipo,
            ALL_ARCHETYPES,
            8,
          ),
          quizType: 'pool-select',
          autocompleteLength: 12,
        },
        {
          question: 'Asociaciones al derecho',
          answer: null,
          answers: arcanos_mayores['04'].keywords.upright,
          quizType: 'pool-select-multiple',
          options: buildMultipleStringOptions(
            arcanos_mayores['04'].keywords.upright,
            ALL_UPRIGHT,
            arcanos_mayores['04'].keywords.upright.length * 4,
          ),
        },
        {
          question: 'Asociaciones al revés',
          answer: null,
          answers: arcanos_mayores['04'].keywords.reversed,
          quizType: 'pool-select-multiple',
          options: buildMultipleStringOptions(
            arcanos_mayores['04'].keywords.reversed,
            ALL_REVERSED,
            arcanos_mayores['04'].keywords.reversed.length * 2,
          ),
          autocompleteLength: 2,
        },
      ],
    },
    // 5
    {
      moduleType: 'major-arcana',
      key: '05',
      title: 'El Sumo Sacerdote / The Hierophant',
      hint: 'El arcano sumo sacerdote representa ...',
      quiz: [
        {
          question: 'Numero o posición',
          answer: '5',
          quizType: 'input-text',
          options: null,
        },
        {
          question: 'Principio energético',
          answer: principios.yin,
          quizType: 'multi-choice',
          options: [principios.yang, principios.yin],
        },
        {
          question: 'Elemento',
          answer: elementos.earth,
          quizType: 'pool-select',
          options: elementOptions,
        },
        {
          question: 'Ancla visual',
          answer: arcanos_mayores['05'].anclaVisual,
          options: buildSingleStringOptions(
            arcanos_mayores['05'].anclaVisual,
            ALL_VISUAL,
            8,
          ),
          quizType: 'pool-select',
          autocompleteLength: 10,
        },
        {
          question: 'Arquetipo',
          answer: arcanos_mayores['05'].arquetipo,
          options: buildSingleStringOptions(
            arcanos_mayores['05'].arquetipo,
            ALL_ARCHETYPES,
            8,
          ),
          quizType: 'pool-select',
          autocompleteLength: 12,
        },
        {
          question: 'Asociaciones al derecho',
          answer: null,
          answers: arcanos_mayores['05'].keywords.upright,
          quizType: 'pool-select-multiple',
          options: buildMultipleStringOptions(
            arcanos_mayores['05'].keywords.upright,
            ALL_UPRIGHT,
            arcanos_mayores['05'].keywords.upright.length * 4,
          ),
        },
        {
          question: 'Asociaciones al revés',
          answer: null,
          answers: arcanos_mayores['05'].keywords.reversed,
          quizType: 'pool-select-multiple',
          options: buildMultipleStringOptions(
            arcanos_mayores['05'].keywords.reversed,
            ALL_REVERSED,
            arcanos_mayores['05'].keywords.reversed.length * 2,
          ),
          autocompleteLength: 2,
        },
      ],
    },
    // 6
    {
      moduleType: 'major-arcana',
      key: '06',
      title: 'Los Enamorados / The Lovers',
      hint: 'El arcano Los Enamorados representa ...',
      quiz: [
        {
          question: 'Numero o posición',
          answer: '6',
          quizType: 'input-text',
          options: null,
        },
        {
          question: 'Principio energético',
          answer: principios.yang,
          quizType: 'multi-choice',
          options: [principios.yang, principios.yin],
        },
        {
          question: 'Elemento',
          answer: elementos.air,
          quizType: 'pool-select',
          options: elementOptions,
        },
        {
          question: 'Ancla visual',
          answer: arcanos_mayores['06'].anclaVisual,
          options: buildSingleStringOptions(
            arcanos_mayores['06'].anclaVisual,
            ALL_VISUAL,
            8,
          ),
          quizType: 'pool-select',
          autocompleteLength: 10,
        },
        {
          question: 'Arquetipo',
          answer: arcanos_mayores['06'].arquetipo,
          options: buildSingleStringOptions(
            arcanos_mayores['06'].arquetipo,
            ALL_ARCHETYPES,
            8,
          ),
          quizType: 'pool-select',
          autocompleteLength: 12,
        },
        {
          question: 'Asociaciones al derecho',
          answer: null,
          answers: arcanos_mayores['06'].keywords.upright,
          quizType: 'pool-select-multiple',
          options: buildMultipleStringOptions(
            arcanos_mayores['06'].keywords.upright,
            ALL_UPRIGHT,
            arcanos_mayores['06'].keywords.upright.length * 4,
          ),
        },
        {
          question: 'Asociaciones al revés',
          answer: null,
          answers: arcanos_mayores['06'].keywords.reversed,
          quizType: 'pool-select-multiple',
          options: buildMultipleStringOptions(
            arcanos_mayores['06'].keywords.reversed,
            ALL_REVERSED,
            arcanos_mayores['06'].keywords.reversed.length * 2,
          ),
          autocompleteLength: 2,
        },
      ],
    },
    // 7
    {
      moduleType: 'major-arcana',
      key: '07',
      title: 'El Carro / The Chariot',
      hint: 'El arcano El Carro representa ...',
      quiz: [
        {
          question: 'Numero o posición',
          answer: '7',
          quizType: 'input-text',
          options: null,
        },
        {
          question: 'Principio energético',
          answer: principios.yin,
          quizType: 'multi-choice',
          options: [principios.yang, principios.yin],
        },
        {
          question: 'Elemento',
          answer: elementos.water,
          quizType: 'pool-select',
          options: elementOptions,
        },
        {
          question: 'Ancla visual',
          answer: arcanos_mayores['07'].anclaVisual,
          options: buildSingleStringOptions(
            arcanos_mayores['07'].anclaVisual,
            ALL_VISUAL,
            8,
          ),
          quizType: 'pool-select',
          autocompleteLength: 10,
        },
        {
          question: 'Arquetipo',
          answer: arcanos_mayores['07'].arquetipo,
          options: buildSingleStringOptions(
            arcanos_mayores['07'].arquetipo,
            ALL_ARCHETYPES,
            8,
          ),
          quizType: 'pool-select',
          autocompleteLength: 12,
        },
        {
          question: 'Asociaciones al derecho',
          answer: null,
          answers: arcanos_mayores['07'].keywords.upright,
          quizType: 'pool-select-multiple',
          options: buildMultipleStringOptions(
            arcanos_mayores['07'].keywords.upright,
            ALL_UPRIGHT,
            arcanos_mayores['07'].keywords.upright.length * 4,
          ),
        },
        {
          question: 'Asociaciones al revés',
          answer: null,
          answers: arcanos_mayores['07'].keywords.reversed,
          quizType: 'pool-select-multiple',
          options: buildMultipleStringOptions(
            arcanos_mayores['07'].keywords.reversed,
            ALL_REVERSED,
            arcanos_mayores['07'].keywords.reversed.length * 2,
          ),
          autocompleteLength: 2,
        },
      ],
    },
    // 8
    {
      moduleType: 'major-arcana',
      key: '08',
      title: 'La Fuerza / Strength',
      hint: 'El arcano La Fuerza representa ...',
      quiz: [
        {
          question: 'Numero o posición',
          answer: '8',
          quizType: 'input-text',
          options: null,
        },
        {
          question: 'Principio energético',
          answer: principios.yang,
          quizType: 'multi-choice',
          options: [principios.yang, principios.yin],
        },
        {
          question: 'Elemento',
          answer: elementos.fire,
          quizType: 'pool-select',
          options: elementOptions,
        },
        {
          question: 'Ancla visual',
          answer: arcanos_mayores['08'].anclaVisual,
          options: buildSingleStringOptions(
            arcanos_mayores['08'].anclaVisual,
            ALL_VISUAL,
            8,
          ),
          quizType: 'pool-select',
          autocompleteLength: 10,
        },
        {
          question: 'Arquetipo',
          answer: arcanos_mayores['08'].arquetipo,
          options: buildSingleStringOptions(
            arcanos_mayores['08'].arquetipo,
            ALL_ARCHETYPES,
            8,
          ),
          quizType: 'pool-select',
          autocompleteLength: 12,
        },
        {
          question: 'Asociaciones al derecho',
          answer: null,
          answers: arcanos_mayores['08'].keywords.upright,
          quizType: 'pool-select-multiple',
          options: buildMultipleStringOptions(
            arcanos_mayores['08'].keywords.upright,
            ALL_UPRIGHT,
            arcanos_mayores['08'].keywords.upright.length * 4,
          ),
        },
        {
          question: 'Asociaciones al revés',
          answer: null,
          answers: arcanos_mayores['08'].keywords.reversed,
          quizType: 'pool-select-multiple',
          options: buildMultipleStringOptions(
            arcanos_mayores['08'].keywords.reversed,
            ALL_REVERSED,
            arcanos_mayores['08'].keywords.reversed.length * 2,
          ),
          autocompleteLength: 2,
        },
      ],
    },
    // 9
    {
      moduleType: 'major-arcana',
      key: '09',
      title: 'El Ermitaño / The Hermit',
      hint: 'El arcano El Ermitaño representa ...',
      quiz: [
        {
          question: 'Numero o posición',
          answer: '9',
          quizType: 'input-text',
          options: null,
        },
        {
          question: 'Principio energético',
          answer: principios.yang,
          quizType: 'multi-choice',
          options: [principios.yang, principios.yin],
        },
        {
          question: 'Elemento',
          answer: elementos.earth,
          quizType: 'pool-select',
          options: elementOptions,
        },
        {
          question: 'Ancla visual',
          answer: arcanos_mayores['09'].anclaVisual,
          options: buildSingleStringOptions(
            arcanos_mayores['09'].anclaVisual,
            ALL_VISUAL,
            8,
          ),
          quizType: 'pool-select',
          autocompleteLength: 10,
        },
        {
          question: 'Arquetipo',
          answer: arcanos_mayores['09'].arquetipo,
          options: buildSingleStringOptions(
            arcanos_mayores['09'].arquetipo,
            ALL_ARCHETYPES,
            8,
          ),
          quizType: 'pool-select',
          autocompleteLength: 12,
        },
        {
          question: 'Asociaciones al derecho',
          answer: null,
          answers: arcanos_mayores['09'].keywords.upright,
          quizType: 'pool-select-multiple',
          options: buildMultipleStringOptions(
            arcanos_mayores['09'].keywords.upright,
            ALL_UPRIGHT,
            arcanos_mayores['09'].keywords.upright.length * 4,
          ),
        },
        {
          question: 'Asociaciones al revés',
          answer: null,
          answers: arcanos_mayores['09'].keywords.reversed,
          quizType: 'pool-select-multiple',
          options: buildMultipleStringOptions(
            arcanos_mayores['09'].keywords.reversed,
            ALL_REVERSED,
            arcanos_mayores['09'].keywords.reversed.length * 2,
          ),
          autocompleteLength: 2,
        },
      ],
    },
    // 10
    {
      moduleType: 'major-arcana',
      key: '10',
      title: 'La Rueda de la Fortuna / Wheel of Fortune',
      hint: 'El arcano La Rueda de la Fortuna representa ...',
      quiz: [
        {
          question: 'Numero o posición',
          answer: '10',
          quizType: 'input-text',
          options: null,
        },
        {
          question: 'Principio energético',
          answer: principios.yang,
          quizType: 'multi-choice',
          options: [principios.yang, principios.yin],
        },
        {
          question: 'Elemento',
          answer: elementos.fire,
          quizType: 'pool-select',
          options: elementOptions,
        },
        {
          question: 'Ancla visual',
          answer: arcanos_mayores['10'].anclaVisual,
          options: buildSingleStringOptions(
            arcanos_mayores['10'].anclaVisual,
            ALL_VISUAL,
            8,
          ),
          quizType: 'pool-select',
          autocompleteLength: 10,
        },
        {
          question: 'Arquetipo',
          answer: arcanos_mayores['10'].arquetipo,
          options: buildSingleStringOptions(
            arcanos_mayores['10'].arquetipo,
            ALL_ARCHETYPES,
            8,
          ),
          quizType: 'pool-select',
          autocompleteLength: 12,
        },
        {
          question: 'Asociaciones al derecho',
          answer: null,
          answers: arcanos_mayores['10'].keywords.upright,
          quizType: 'pool-select-multiple',
          options: buildMultipleStringOptions(
            arcanos_mayores['10'].keywords.upright,
            ALL_UPRIGHT,
            arcanos_mayores['10'].keywords.upright.length * 4,
          ),
        },
        {
          question: 'Asociaciones al revés',
          answer: null,
          answers: arcanos_mayores['10'].keywords.reversed,
          quizType: 'pool-select-multiple',
          options: buildMultipleStringOptions(
            arcanos_mayores['10'].keywords.reversed,
            ALL_REVERSED,
            arcanos_mayores['10'].keywords.reversed.length * 2,
          ),
          autocompleteLength: 2,
        },
      ],
    },
    // 11
    {
      moduleType: 'major-arcana',
      key: '11',
      title: 'La Justicia / Justice',
      hint: 'El arcano La Justicia representa ...',
      quiz: [
        {
          question: 'Numero o posición',
          answer: '11',
          quizType: 'input-text',
          options: null,
        },
        {
          question: 'Principio energético',
          answer: principios.yang,
          quizType: 'multi-choice',
          options: [principios.yang, principios.yin],
        },
        {
          question: 'Elemento',
          answer: elementos.air,
          quizType: 'pool-select',
          options: elementOptions,
        },
        {
          question: 'Ancla visual',
          answer: arcanos_mayores['11'].anclaVisual,
          options: buildSingleStringOptions(
            arcanos_mayores['11'].anclaVisual,
            ALL_VISUAL,
            8,
          ),
          quizType: 'pool-select',
          autocompleteLength: 10,
        },
        {
          question: 'Arquetipo',
          answer: arcanos_mayores['11'].arquetipo,
          options: buildSingleStringOptions(
            arcanos_mayores['11'].arquetipo,
            ALL_ARCHETYPES,
            8,
          ),
          quizType: 'pool-select',
          autocompleteLength: 12,
        },
        {
          question: 'Asociaciones al derecho',
          answer: null,
          answers: arcanos_mayores['11'].keywords.upright,
          quizType: 'pool-select-multiple',
          options: buildMultipleStringOptions(
            arcanos_mayores['11'].keywords.upright,
            ALL_UPRIGHT,
            arcanos_mayores['11'].keywords.upright.length * 4,
          ),
        },
        {
          question: 'Asociaciones al revés',
          answer: null,
          answers: arcanos_mayores['11'].keywords.reversed,
          quizType: 'pool-select-multiple',
          options: buildMultipleStringOptions(
            arcanos_mayores['11'].keywords.reversed,
            ALL_REVERSED,
            arcanos_mayores['11'].keywords.reversed.length * 2,
          ),
          autocompleteLength: 2,
        },
      ],
    },
    // 12
    {
      moduleType: 'major-arcana',
      key: '12',
      title: 'El Colgado / The Hanged Man',
      hint: 'El arcano El Colgado representa ...',
      quiz: [
        {
          question: 'Numero o posición',
          answer: '12',
          quizType: 'input-text',
          options: null,
        },
        {
          question: 'Principio energético',
          answer: principios.yin,
          quizType: 'multi-choice',
          options: [principios.yang, principios.yin],
        },
        {
          question: 'Elemento',
          answer: elementos.water,
          quizType: 'pool-select',
          options: elementOptions,
        },
        {
          question: 'Ancla visual',
          answer: arcanos_mayores['12'].anclaVisual,
          options: buildSingleStringOptions(
            arcanos_mayores['12'].anclaVisual,
            ALL_VISUAL,
            8,
          ),
          quizType: 'pool-select',
          autocompleteLength: 10,
        },
        {
          question: 'Arquetipo',
          answer: arcanos_mayores['12'].arquetipo,
          options: buildSingleStringOptions(
            arcanos_mayores['12'].arquetipo,
            ALL_ARCHETYPES,
            8,
          ),
          quizType: 'pool-select',
          autocompleteLength: 12,
        },
        {
          question: 'Asociaciones al derecho',
          answer: null,
          answers: arcanos_mayores['12'].keywords.upright,
          quizType: 'pool-select-multiple',
          options: buildMultipleStringOptions(
            arcanos_mayores['12'].keywords.upright,
            ALL_UPRIGHT,
            arcanos_mayores['12'].keywords.upright.length * 4,
          ),
        },
        {
          question: 'Asociaciones al revés',
          answer: null,
          answers: arcanos_mayores['12'].keywords.reversed,
          quizType: 'pool-select-multiple',
          options: buildMultipleStringOptions(
            arcanos_mayores['12'].keywords.reversed,
            ALL_REVERSED,
            arcanos_mayores['12'].keywords.reversed.length * 2,
          ),
          autocompleteLength: 2,
        },
      ],
    },
    // 13
    {
      moduleType: 'major-arcana',
      key: '13',
      title: 'La Muerte / Death',
      hint: 'El arcano La Muerte representa ...',
      quiz: [
        {
          question: 'Numero o posición',
          answer: '13',
          quizType: 'input-text',
          options: null,
        },
        {
          question: 'Principio energético',
          answer: principios.yin,
          quizType: 'multi-choice',
          options: [principios.yang, principios.yin],
        },
        {
          question: 'Elemento',
          answer: elementos.water,
          quizType: 'pool-select',
          options: elementOptions,
        },
        {
          question: 'Ancla visual',
          answer: arcanos_mayores['13'].anclaVisual,
          options: buildSingleStringOptions(
            arcanos_mayores['13'].anclaVisual,
            ALL_VISUAL,
            8,
          ),
          quizType: 'pool-select',
          autocompleteLength: 10,
        },
        {
          question: 'Arquetipo',
          answer: arcanos_mayores['13'].arquetipo,
          options: buildSingleStringOptions(
            arcanos_mayores['13'].arquetipo,
            ALL_ARCHETYPES,
            8,
          ),
          quizType: 'pool-select',
          autocompleteLength: 12,
        },
        {
          question: 'Asociaciones al derecho',
          answer: null,
          answers: arcanos_mayores['13'].keywords.upright,
          quizType: 'pool-select-multiple',
          options: buildMultipleStringOptions(
            arcanos_mayores['13'].keywords.upright,
            ALL_UPRIGHT,
            arcanos_mayores['13'].keywords.upright.length * 4,
          ),
        },
        {
          question: 'Asociaciones al revés',
          answer: null,
          answers: arcanos_mayores['13'].keywords.reversed,
          quizType: 'pool-select-multiple',
          options: buildMultipleStringOptions(
            arcanos_mayores['13'].keywords.reversed,
            ALL_REVERSED,
            arcanos_mayores['13'].keywords.reversed.length * 2,
          ),
          autocompleteLength: 2,
        },
      ],
    },
    // 14
    {
      moduleType: 'major-arcana',
      key: '14',
      title: 'La Templanza / Temperance',
      hint: 'El arcano La Templanza representa ...',
      quiz: [
        {
          question: 'Numero o posición',
          answer: '14',
          quizType: 'input-text',
          options: null,
        },
        {
          question: 'Principio energético',
          answer: principios.yang,
          quizType: 'multi-choice',
          options: [principios.yang, principios.yin],
        },
        {
          question: 'Elemento',
          answer: elementos.fire,
          quizType: 'pool-select',
          options: elementOptions,
        },
        {
          question: 'Ancla visual',
          answer: arcanos_mayores['14'].anclaVisual,
          options: buildSingleStringOptions(
            arcanos_mayores['14'].anclaVisual,
            ALL_VISUAL,
            8,
          ),
          quizType: 'pool-select',
          autocompleteLength: 10,
        },
        {
          question: 'Arquetipo',
          answer: arcanos_mayores['14'].arquetipo,
          options: buildSingleStringOptions(
            arcanos_mayores['14'].arquetipo,
            ALL_ARCHETYPES,
            8,
          ),
          quizType: 'pool-select',
          autocompleteLength: 12,
        },
        {
          question: 'Asociaciones al derecho',
          answer: null,
          answers: arcanos_mayores['14'].keywords.upright,
          quizType: 'pool-select-multiple',
          options: buildMultipleStringOptions(
            arcanos_mayores['14'].keywords.upright,
            ALL_UPRIGHT,
            arcanos_mayores['14'].keywords.upright.length * 4,
          ),
        },
        {
          question: 'Asociaciones al revés',
          answer: null,
          answers: arcanos_mayores['14'].keywords.reversed,
          quizType: 'pool-select-multiple',
          options: buildMultipleStringOptions(
            arcanos_mayores['14'].keywords.reversed,
            ALL_REVERSED,
            arcanos_mayores['14'].keywords.reversed.length * 2,
          ),
          autocompleteLength: 2,
        },
      ],
    },
    // 15
    {
      moduleType: 'major-arcana',
      key: '15',
      title: 'El Diablo / The Devil',
      hint: 'El arcano El Diablo representa ...',
      quiz: [
        {
          question: 'Numero o posición',
          answer: '15',
          quizType: 'input-text',
          options: null,
        },
        {
          question: 'Principio energético',
          answer: principios.yin,
          quizType: 'multi-choice',
          options: [principios.yang, principios.yin],
        },
        {
          question: 'Elemento',
          answer: elementos.earth,
          quizType: 'pool-select',
          options: elementOptions,
        },
        {
          question: 'Ancla visual',
          answer: arcanos_mayores['15'].anclaVisual,
          options: buildSingleStringOptions(
            arcanos_mayores['15'].anclaVisual,
            ALL_VISUAL,
            8,
          ),
          quizType: 'pool-select',
          autocompleteLength: 10,
        },
        {
          question: 'Arquetipo',
          answer: arcanos_mayores['15'].arquetipo,
          options: buildSingleStringOptions(
            arcanos_mayores['15'].arquetipo,
            ALL_ARCHETYPES,
            8,
          ),
          quizType: 'pool-select',
          autocompleteLength: 12,
        },
        {
          question: 'Asociaciones al derecho',
          answer: null,
          answers: arcanos_mayores['15'].keywords.upright,
          quizType: 'pool-select-multiple',
          options: buildMultipleStringOptions(
            arcanos_mayores['15'].keywords.upright,
            ALL_UPRIGHT,
            arcanos_mayores['15'].keywords.upright.length * 4,
          ),
        },
        {
          question: 'Asociaciones al revés',
          answer: null,
          answers: arcanos_mayores['15'].keywords.reversed,
          quizType: 'pool-select-multiple',
          options: buildMultipleStringOptions(
            arcanos_mayores['15'].keywords.reversed,
            ALL_REVERSED,
            arcanos_mayores['15'].keywords.reversed.length * 2,
          ),
          autocompleteLength: 2,
        },
      ],
    },
    // 16
    {
      moduleType: 'major-arcana',
      key: '16',
      title: 'La Torre / The Tower',
      hint: 'El arcano La Torre representa ...',
      quiz: [
        {
          question: 'Numero o posición',
          answer: '16',
          quizType: 'input-text',
          options: null,
        },
        {
          question: 'Principio energético',
          answer: principios.yang,
          quizType: 'multi-choice',
          options: [principios.yang, principios.yin],
        },
        {
          question: 'Elemento',
          answer: elementos.fire,
          quizType: 'pool-select',
          options: elementOptions,
        },
        {
          question: 'Ancla visual',
          answer: arcanos_mayores['16'].anclaVisual,
          options: buildSingleStringOptions(
            arcanos_mayores['16'].anclaVisual,
            ALL_VISUAL,
            8,
          ),
          quizType: 'pool-select',
          autocompleteLength: 10,
        },
        {
          question: 'Arquetipo',
          answer: arcanos_mayores['16'].arquetipo,
          options: buildSingleStringOptions(
            arcanos_mayores['16'].arquetipo,
            ALL_ARCHETYPES,
            8,
          ),
          quizType: 'pool-select',
          autocompleteLength: 12,
        },
        {
          question: 'Asociaciones al derecho',
          answer: null,
          answers: arcanos_mayores['16'].keywords.upright,
          quizType: 'pool-select-multiple',
          options: buildMultipleStringOptions(
            arcanos_mayores['16'].keywords.upright,
            ALL_UPRIGHT,
            arcanos_mayores['16'].keywords.upright.length * 4,
          ),
        },
        {
          question: 'Asociaciones al revés',
          answer: null,
          answers: arcanos_mayores['16'].keywords.reversed,
          quizType: 'pool-select-multiple',
          options: buildMultipleStringOptions(
            arcanos_mayores['16'].keywords.reversed,
            ALL_REVERSED,
            arcanos_mayores['16'].keywords.reversed.length * 2,
          ),
          autocompleteLength: 2,
        },
      ],
    },
    // 17
    {
      moduleType: 'major-arcana',
      key: '17',
      title: 'La Estrella / The Star',
      hint: 'El arcano La Estrella representa ...',
      quiz: [
        {
          question: 'Numero o posición',
          answer: '17',
          quizType: 'input-text',
          options: null,
        },
        {
          question: 'Principio energético',
          answer: principios.yang,
          quizType: 'multi-choice',
          options: [principios.yang, principios.yin],
        },
        {
          question: 'Elemento',
          answer: elementos.air,
          quizType: 'pool-select',
          options: elementOptions,
        },
        {
          question: 'Ancla visual',
          answer: arcanos_mayores['17'].anclaVisual,
          options: buildSingleStringOptions(
            arcanos_mayores['17'].anclaVisual,
            ALL_VISUAL,
            8,
          ),
          quizType: 'pool-select',
          autocompleteLength: 10,
        },
        {
          question: 'Arquetipo',
          answer: arcanos_mayores['17'].arquetipo,
          options: buildSingleStringOptions(
            arcanos_mayores['17'].arquetipo,
            ALL_ARCHETYPES,
            8,
          ),
          quizType: 'pool-select',
          autocompleteLength: 12,
        },
        {
          question: 'Asociaciones al derecho',
          answer: null,
          answers: arcanos_mayores['17'].keywords.upright,
          quizType: 'pool-select-multiple',
          options: buildMultipleStringOptions(
            arcanos_mayores['17'].keywords.upright,
            ALL_UPRIGHT,
            arcanos_mayores['17'].keywords.upright.length * 4,
          ),
        },
        {
          question: 'Asociaciones al revés',
          answer: null,
          answers: arcanos_mayores['17'].keywords.reversed,
          quizType: 'pool-select-multiple',
          options: buildMultipleStringOptions(
            arcanos_mayores['17'].keywords.reversed,
            ALL_REVERSED,
            arcanos_mayores['17'].keywords.reversed.length * 2,
          ),
          autocompleteLength: 2,
        },
      ],
    },
    // 18
    {
      moduleType: 'major-arcana',
      key: '18',
      title: 'La Luna / The Moon',
      hint: 'El arcano La Luna representa ...',
      quiz: [
        {
          question: 'Numero o posición',
          answer: '18',
          quizType: 'input-text',
          options: null,
        },
        {
          question: 'Principio energético',
          answer: principios.yin,
          quizType: 'multi-choice',
          options: [principios.yang, principios.yin],
        },
        {
          question: 'Elemento',
          answer: elementos.water,
          quizType: 'pool-select',
          options: elementOptions,
        },
        {
          question: 'Ancla visual',
          answer: arcanos_mayores['18'].anclaVisual,
          options: buildSingleStringOptions(
            arcanos_mayores['18'].anclaVisual,
            ALL_VISUAL,
            8,
          ),
          quizType: 'pool-select',
          autocompleteLength: 10,
        },
        {
          question: 'Arquetipo',
          answer: arcanos_mayores['18'].arquetipo,
          options: buildSingleStringOptions(
            arcanos_mayores['18'].arquetipo,
            ALL_ARCHETYPES,
            8,
          ),
          quizType: 'pool-select',
          autocompleteLength: 12,
        },
        {
          question: 'Asociaciones al derecho',
          answer: null,
          answers: arcanos_mayores['18'].keywords.upright,
          quizType: 'pool-select-multiple',
          options: buildMultipleStringOptions(
            arcanos_mayores['18'].keywords.upright,
            ALL_UPRIGHT,
            arcanos_mayores['18'].keywords.upright.length * 4,
          ),
        },
        {
          question: 'Asociaciones al revés',
          answer: null,
          answers: arcanos_mayores['18'].keywords.reversed,
          quizType: 'pool-select-multiple',
          options: buildMultipleStringOptions(
            arcanos_mayores['18'].keywords.reversed,
            ALL_REVERSED,
            arcanos_mayores['18'].keywords.reversed.length * 2,
          ),
          autocompleteLength: 2,
        },
      ],
    },
    // 19
    {
      moduleType: 'major-arcana',
      key: '19',
      title: 'El Sol / The Sun',
      hint: 'El arcano El Sol representa ...',
      quiz: [
        {
          question: 'Numero o posición',
          answer: '19',
          quizType: 'input-text',
          options: null,
        },
        {
          question: 'Principio energético',
          answer: principios.yang,
          quizType: 'multi-choice',
          options: [principios.yang, principios.yin],
        },
        {
          question: 'Elemento',
          answer: elementos.fire,
          quizType: 'pool-select',
          options: elementOptions,
        },
        {
          question: 'Ancla visual',
          answer: arcanos_mayores['19'].anclaVisual,
          options: buildSingleStringOptions(
            arcanos_mayores['19'].anclaVisual,
            ALL_VISUAL,
            8,
          ),
          quizType: 'pool-select',
          autocompleteLength: 10,
        },
        {
          question: 'Arquetipo',
          answer: arcanos_mayores['19'].arquetipo,
          options: buildSingleStringOptions(
            arcanos_mayores['19'].arquetipo,
            ALL_ARCHETYPES,
            8,
          ),
          quizType: 'pool-select',
          autocompleteLength: 12,
        },
        {
          question: 'Asociaciones al derecho',
          answer: null,
          answers: arcanos_mayores['19'].keywords.upright,
          quizType: 'pool-select-multiple',
          options: buildMultipleStringOptions(
            arcanos_mayores['19'].keywords.upright,
            ALL_UPRIGHT,
            arcanos_mayores['19'].keywords.upright.length * 4,
          ),
        },
        {
          question: 'Asociaciones al revés',
          answer: null,
          answers: arcanos_mayores['19'].keywords.reversed,
          quizType: 'pool-select-multiple',
          options: buildMultipleStringOptions(
            arcanos_mayores['19'].keywords.reversed,
            ALL_REVERSED,
            arcanos_mayores['19'].keywords.reversed.length * 2,
          ),
          autocompleteLength: 2,
        },
      ],
    },
    // 20
    {
      moduleType: 'major-arcana',
      key: '20',
      title: 'El Juicio / The Judgement',
      hint: 'El arcano El Juicio representa ...',
      quiz: [
        {
          question: 'Numero o posición',
          answer: '20',
          quizType: 'input-text',
          options: null,
        },
        {
          question: 'Principios energéticos',
          answer: null,
          answers: [principios.yang, principios.yin],
          quizType: 'pool-select-multiple',
          options: [principios.yang, principios.yin],
        },
        {
          question: 'Elemento',
          answer: null,
          answers: [elementos.fire, elementos.water],
          quizType: 'pool-select-multiple',
          options: elementOptions,
        },
        {
          question: 'Ancla visual',
          answer: arcanos_mayores['20'].anclaVisual,
          options: buildSingleStringOptions(
            arcanos_mayores['20'].anclaVisual,
            ALL_VISUAL,
            8,
          ),
          quizType: 'pool-select',
          autocompleteLength: 10,
        },
        {
          question: 'Arquetipo',
          answer: arcanos_mayores['20'].arquetipo,
          options: buildSingleStringOptions(
            arcanos_mayores['20'].arquetipo,
            ALL_ARCHETYPES,
            8,
          ),
          quizType: 'pool-select',
          autocompleteLength: 12,
        },
        {
          question: 'Asociaciones al derecho',
          answer: null,
          answers: arcanos_mayores['20'].keywords.upright,
          quizType: 'pool-select-multiple',
          options: buildMultipleStringOptions(
            arcanos_mayores['20'].keywords.upright,
            ALL_UPRIGHT,
            arcanos_mayores['20'].keywords.upright.length * 4,
          ),
        },
        {
          question: 'Asociaciones al revés',
          answer: null,
          answers: arcanos_mayores['20'].keywords.reversed,
          quizType: 'pool-select-multiple',
          options: buildMultipleStringOptions(
            arcanos_mayores['20'].keywords.reversed,
            ALL_REVERSED,
            arcanos_mayores['20'].keywords.reversed.length * 2,
          ),
          autocompleteLength: 2,
        },
      ],
    },
    // 21
    {
      moduleType: 'major-arcana',
      key: '21',
      title: 'El Mundo / The World',
      hint: 'El arcano El Mundo representa ...',
      quiz: [
        {
          question: 'Numero o posición',
          answer: '21',
          quizType: 'input-text',
          options: null,
        },
        {
          question: 'Principio energético',
          answer: principios.yin,
          quizType: 'multi-choice',
          options: [principios.yang, principios.yin],
        },
        {
          question: 'Elemento',
          answer: elementos.earth,
          quizType: 'pool-select',
          options: elementOptions,
        },
        {
          question: 'Ancla visual',
          answer: arcanos_mayores['21'].anclaVisual,
          options: buildSingleStringOptions(
            arcanos_mayores['21'].anclaVisual,
            ALL_VISUAL,
            8,
          ),
          quizType: 'pool-select',
          autocompleteLength: 10,
        },
        {
          question: 'Arquetipo',
          answer: arcanos_mayores['21'].arquetipo,
          options: buildSingleStringOptions(
            arcanos_mayores['21'].arquetipo,
            ALL_ARCHETYPES,
            8,
          ),
          quizType: 'pool-select',
          autocompleteLength: 12,
        },
        {
          question: 'Asociaciones al derecho',
          answer: null,
          answers: arcanos_mayores['21'].keywords.upright,
          quizType: 'pool-select-multiple',
          options: buildMultipleStringOptions(
            arcanos_mayores['21'].keywords.upright,
            ALL_UPRIGHT,
            arcanos_mayores['21'].keywords.upright.length * 4,
          ),
        },
        {
          question: 'Asociaciones al revés',
          answer: null,
          answers: arcanos_mayores['21'].keywords.reversed,
          quizType: 'pool-select-multiple',
          options: buildMultipleStringOptions(
            arcanos_mayores['21'].keywords.reversed,
            ALL_REVERSED,
            arcanos_mayores['21'].keywords.reversed.length * 2,
          ),
          autocompleteLength: 2,
        },
      ],
    },
  ],
}
