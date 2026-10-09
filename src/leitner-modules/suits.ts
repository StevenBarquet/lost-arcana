import { RESPUESTAS_COMUNES } from './respuestas-comunes'
import type { ILeitnerModule } from './types'

const { principios, elementos } = RESPUESTAS_COMUNES

const elementOptions = [
  elementos.fire,
  elementos.air,
  elementos.water,
  elementos.earth,
]

export const SUITS_MODULE: ILeitnerModule<'suits'> = {
  metadata: {
    title: 'Palos',
    icon: 'material-symbols-light:cards-star',
    key: 'suits',
  },
  facts: [
    {
      moduleType: 'suits',
      key: 'wands',
      title: 'Bastos / Wands',
      hint: 'Los bastos representan ...',
      quiz: [
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
      ],
    },
    {
      moduleType: 'suits',
      key: 'cups',
      title: 'Copas / Cups',
      hint: 'Las copas representan ...',
      quiz: [
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
      ],
    },
    {
      moduleType: 'suits',
      key: 'swords',
      title: 'Espadas / Swords',
      hint: 'Las espadas representan ...',
      quiz: [
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
      ],
    },
    {
      moduleType: 'suits',
      key: 'pentacles',
      title: 'Oros / Pentacles',
      hint: 'Los oros representan ...',
      quiz: [
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
      ],
    },
  ],
}
