// ---Dependencies
import { type ReactElement } from 'react'
// ---Styles
import style from './Biblioteca.module.scss'
import { Greeting } from 'src/common/app/Greeting/Greeting'
import { PracticeConfig } from 'src/common/app/PracticeConfig/PracticeConfig'

/**
 * Biblioteca Component:  Descripción del comportamiento...
 */
export function Biblioteca(): ReactElement {
  // -----------------------CONSTS, HOOKS, STATES
  // -----------------------MAIN METHODS
  // -----------------------HELPERS
  // -----------------------RENDER
  return (
    <div className={style['Biblioteca']}>
      <div className="centerContainer">
        <Greeting title="Biblioteca" subTitle="Revisa todos los módulos" />
        <PracticeConfig />
      </div>
    </div>
  )
}
