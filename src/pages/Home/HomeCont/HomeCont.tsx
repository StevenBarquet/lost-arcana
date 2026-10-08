// ---Dependencies
import type { ReactElement } from 'react'
import style from './HomeCont.module.scss'
import { Greeting } from './Greeting/Greeting'
import { PracticeConfig } from './PracticeConfig/PracticeConfig'

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
      </div>
    </div>
  )
}
