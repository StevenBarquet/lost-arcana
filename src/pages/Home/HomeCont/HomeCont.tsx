// ---Dependencies
import type { ReactElement } from 'react'
// ---Components
import { Greeting } from './Greeting/Greeting'
import { PracticeConfig } from './PracticeConfig/PracticeConfig'
import { QuizSelector } from './QuizSelector/QuizSelector'
// ---Styles
import style from './HomeCont.module.scss'
import { QuizCtrlContext, useQuizCtrl } from './quiz-controller'
import { Quiz } from './Quiz/Quiz'

export function HomeCont(): ReactElement {
  // -----------------------CONSTS, HOOKS, STATES
  const quizCtrl = useQuizCtrl()
  // -----------------------MAIN METHODS
  // -----------------------HELPERS
  // -----------------------RENDER
  return (
    <QuizCtrlContext.Provider value={quizCtrl}>
      <div className={style['HomeCont']}>
        <div className="centerContainer">
          <Greeting />
          <PracticeConfig />
          <QuizSelector />
          <Quiz />
        </div>
      </div>
    </QuizCtrlContext.Provider>
  )
}
