// ---Dependencies
import type { ReactElement } from 'react'
import style from './HomeCont.module.scss'

export function HomeCont(): ReactElement {
  // -----------------------CONSTS, HOOKS, STATES
  // -----------------------MAIN METHODS
  // -----------------------HELPERS
  // -----------------------RENDER
  return (
    <div className={style['HomeCont']}>
      <div className="centerContainer">
        <h2>
          Lost <span>Arcana</span>
        </h2>
      </div>
    </div>
  )
}
