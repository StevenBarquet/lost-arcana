// ---Dependencies
import type { ReactElement } from 'react'
// ---Components
import { HealthLink } from './HealthLink/HealthLink'
import { QuizSelector } from './QuizSelector/QuizSelector'
// ---Styles
import style from './HomeCont.module.scss'
import { QuizCtrlContext, useQuizCtrl } from './quiz-controller'
import { Quiz } from './Quiz/Quiz'
import { Greeting } from 'src/common/app/Greeting/Greeting'
import { PracticeConfig } from 'src/common/app/PracticeConfig/PracticeConfig'

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
          {quizCtrl.selectedFacts?.length ? <Quiz /> : null}
          <HealthLink />
        </div>
      </div>
    </QuizCtrlContext.Provider>
  )
}
