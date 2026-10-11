// ---Dependencies
import type { ReactElement } from 'react'
// ---Components
import { Greeting } from 'src/common/app/Greeting/Greeting'
import { PracticeConfig } from 'src/common/app/PracticeConfig/PracticeConfig'
import { QuizSelector } from 'src/common/app/QuizSelector/QuizSelector'
import { HealthLink } from './HealthLink/HealthLink'
import { Quiz } from './Quiz/Quiz'
// ---Config
import { QuizCtrlContext, useQuizCtrl } from './quiz-controller'
// ---Styles
import style from './HomeCont.module.scss'

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
          <QuizSelector
            options={quizCtrl.options}
            onSelectModule={quizCtrl.handleSelectModule}
          />
          {quizCtrl.selectedFacts?.length ? <Quiz /> : null}
          <HealthLink />
        </div>
      </div>
    </QuizCtrlContext.Provider>
  )
}
