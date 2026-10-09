import { RESPUESTAS_COMUNES } from './respuestas-comunes'
import { ILeitnerModule } from './types'

const { principios, traits } = RESPUESTAS_COMUNES

export const ELEMENTS_MODULE: ILeitnerModule<'elements'> = {
  metadata: {
    title: 'Elementos',
    icon: 'solar:fire-bold-duotone',
    key: 'elements',
  },
  facts: [
    {
      moduleType: 'elements',
      key: 'fire',
      title: 'Fuego',
      hint: 'El fuego es un elemento que representa la pasión, la energía y la transformación. Es un símbolo de fuerza y vitalidad, capaz de iluminar y calentar, pero también de destruir.',
      quiz: [
        {
          question: 'Principio energético',
          answer: principios.yang,
          quizType: 'multi-choice',
          options: [principios.yang, principios.yin],
        },
        {
          question: 'Rasgos asociados',
          answer: traits.fire,
          quizType: 'pool-select-from-coma-sep',
          options: [traits.fire, traits.air, traits.water, traits.earth],
        },
      ],
    },
    {
      moduleType: 'elements',
      key: 'air',
      title: 'Aire',
      hint: 'El aire es un elemento que representa la libertad, la comunicación y el intelecto. Es un símbolo de movimiento y cambio, capaz de refrescar y renovar, pero también de dispersar.',
      quiz: [
        {
          question: 'Principio energético',
          answer: principios.yang,
          quizType: 'multi-choice',
          options: [principios.yang, principios.yin],
        },
        {
          question: 'Rasgos asociados',
          answer: traits.air,
          quizType: 'pool-select-from-coma-sep',
          options: [traits.fire, traits.air, traits.water, traits.earth],
        },
      ],
    },
    {
      moduleType: 'elements',
      key: 'water',
      title: 'Agua',
      hint: 'El agua es un elemento que representa la emoción, la intuición y la adaptabilidad. Es un símbolo de fluidez y profundidad, capaz de nutrir y purificar, pero también de erosionar.',
      quiz: [
        {
          question: 'Principio energético',
          answer: principios.yin,
          quizType: 'multi-choice',
          options: [principios.yang, principios.yin],
        },
        {
          question: 'Rasgos asociados',
          answer: traits.water,
          quizType: 'pool-select-from-coma-sep',
          options: [traits.fire, traits.air, traits.water, traits.earth],
        },
      ],
    },
    {
      moduleType: 'elements',
      key: 'earth',
      title: 'Tierra',
      hint: 'La tierra es un elemento que representa la estabilidad, la seguridad y la fertilidad. Es un símbolo de solidez y permanencia, capaz de sustentar y proteger, pero también de limitar.',
      quiz: [
        {
          question: 'Principio energético',
          answer: principios.yin,
          quizType: 'multi-choice',
          options: [principios.yang, principios.yin],
        },
        {
          question: 'Rasgos asociados',
          answer: traits.earth,
          quizType: 'pool-select-from-coma-sep',
          options: [traits.fire, traits.air, traits.water, traits.earth],
        },
      ],
    },
  ],
}
