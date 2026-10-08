export type IQuiz = {
  question: string
  answer: string
  options: string[]
  quizType: 'multi-choice' | 'pool-select-from-coma-sep'
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
