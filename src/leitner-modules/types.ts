export type IQuiz = {
  question: string
  answer: string | null
  answers?: string[]
  options: string[] | null
  quizType:
    | 'multi-choice'
    | 'input-text'
    | 'pool-select'
    | 'pool-select-multiple'
    | 'pool-select-multiple-from-coma-sep'
}

export type IFacts<moduleType extends string> = {
  moduleType: moduleType
  key: string
  title: string
  hint: string
  quiz: IQuiz[]
}
export type ILeitnerModule<moduleType extends string> = {
  metadata: {
    title: string
    icon: string
    key: moduleType
  }
  facts: IFacts<moduleType>[]
}

export type IStoredFact = {
  moduleType: string
  key: string
  box: number
  date: Date
}
