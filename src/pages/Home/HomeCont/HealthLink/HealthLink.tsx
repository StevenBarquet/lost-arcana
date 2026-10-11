// ---Dependencies
import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'
// ---Styles
import style from './HealthLink.module.scss'

export function HealthLink(): ReactElement {
  // -----------------------CONSTS, HOOKS, STATES
  // -----------------------MAIN METHODS
  // -----------------------HELPERS
  // -----------------------RENDER
  return (
    <Link to="/health" className={style['HealthLink']}>
      <span className="dot" />
      <span className="label">System Health</span>
    </Link>
  )
}
