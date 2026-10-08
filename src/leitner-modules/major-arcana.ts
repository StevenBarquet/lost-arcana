import { RESPUESTAS_COMUNES } from './respuestas-comunes'
import type { ILeitnerModule } from './types'

const { principios, elementos } = RESPUESTAS_COMUNES

const elementOptions = [
  elementos.fire,
  elementos.air,
  elementos.water,
  elementos.earth,
]

export const MAJOR_ARCANA_MODULE: ILeitnerModule = {
  metadata: {
    title: 'Arcanos Mayores',
  },
  facts: [
    // 0 — Air, Yang
    {
      moduleType: 'major-arcana',
      key: 'fool',
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
      ],
    },
    // 1 — Earth, Yang
    {
      moduleType: 'major-arcana',
      key: 'magician',
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
      ],
    },
    // 2 — Water, Yin
    {
      moduleType: 'major-arcana',
      key: 'high-priestess',
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
      ],
    },
    // 3 — Earth, Yang
    {
      moduleType: 'major-arcana',
      key: 'empress',
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
      ],
    },
    // 4 — Fire, Yang
    {
      moduleType: 'major-arcana',
      key: 'emperor',
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
      ],
    },
    // 5 — Earth, Yang
    {
      moduleType: 'major-arcana',
      key: 'hierophant',
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
      ],
    },
    // 6 — Air, Yang
    {
      moduleType: 'major-arcana',
      key: 'lovers',
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
      ],
    },
    // 7 — Water, Yin
    {
      moduleType: 'major-arcana',
      key: 'chariot',
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
      ],
    },
    // 8 — Fire, Yang
    {
      moduleType: 'major-arcana',
      key: 'strength',
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
      ],
    },
    // 9 — Earth, Yang
    {
      moduleType: 'major-arcana',
      key: 'hermit',
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
      ],
    },
    // 10 — Fire, Yang
    {
      moduleType: 'major-arcana',
      key: 'wheel-of-fortune',
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
      ],
    },
    // 11 — Air, Yang
    {
      moduleType: 'major-arcana',
      key: 'justice',
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
      ],
    },
    // 12 — Water, Yin
    {
      moduleType: 'major-arcana',
      key: 'hanged-man',
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
      ],
    },
    // 13 — Water, Yin
    {
      moduleType: 'major-arcana',
      key: 'death',
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
      ],
    },
    // 14 — Fire, Yang
    {
      moduleType: 'major-arcana',
      key: 'temperance',
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
      ],
    },
    // 15 — Earth, Yang
    {
      moduleType: 'major-arcana',
      key: 'devil',
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
      ],
    },
    // 16 — Fire, Yang
    {
      moduleType: 'major-arcana',
      key: 'tower',
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
      ],
    },
    // 17 — Air, Yang
    {
      moduleType: 'major-arcana',
      key: 'star',
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
      ],
    },
    // 18 — Water, Yin
    {
      moduleType: 'major-arcana',
      key: 'moon',
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
      ],
    },
    // 19 — Fire, Yang
    {
      moduleType: 'major-arcana',
      key: 'sun',
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
      ],
    },
    // 20 — Fire, Yang & Water, Yin
    {
      moduleType: 'major-arcana',
      key: 'Judgement',
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
      ],
    },
    // 21 — Earth, Yang
    {
      moduleType: 'major-arcana',
      key: 'world',
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
      ],
    },
  ],
}
