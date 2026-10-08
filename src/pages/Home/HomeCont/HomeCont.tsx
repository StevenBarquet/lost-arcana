// ---Dependencies
import type { ReactElement } from 'react'
// ---Components
import { Greeting } from './Greeting/Greeting'
import { PracticeConfig } from './PracticeConfig/PracticeConfig'
import { QuizSelector } from './QuizSelector/QuizSelector'
// ---Styles
import style from './HomeCont.module.scss'

export function HomeCont(): ReactElement {
  // -----------------------CONSTS, HOOKS, STATES
  // -----------------------MAIN METHODS
  // -----------------------HELPERS
  // -----------------------RENDER
  return (
    <div className={style['HomeCont']}>
      <div className="centerContainer">
        <Greeting />
        <PracticeConfig />
        <QuizSelector />
      </div>
    </div>
  )
}
