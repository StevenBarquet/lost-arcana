export type IQuiz = {
  question: string
  answer: string | null
  answers?: string[]
  options: string[] | null
  quizType:
    | 'multi-choice'
    | 'pool-select-multiple'
    | 'pool-select'
    | 'pool-select-from-coma-sep'
    | 'input-text'
}

export type IFacts = {
  moduleType: string
  key: string
  title: string
  hint: string
  quiz: IQuiz[]
}
export type ILeitnerModule = {
  metadata: {
    title: string
  }
  facts: IFacts[]
}
