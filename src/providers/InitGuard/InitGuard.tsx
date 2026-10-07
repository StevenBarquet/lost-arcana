// ---Dependencies
import { type ReactNode, type ReactElement } from 'react'
// ---Styles
import style from './InitGuard.module.scss'
import { usePreferencesStore } from 'src/store/preferences'
import { InitialForm } from './InitialForm/InitialForm'

/**
 * InitGuard Component:  Descripción del comportamiento...
 */
export function InitGuard({ children }: { children: ReactNode }): ReactElement {
  // -----------------------CONSTS, HOOKS, STATES
  const fullName = usePreferencesStore((s) => s.fullName)
  // -----------------------MAIN METHODS
  // -----------------------HELPERS
  // -----------------------RENDER
  return (
    <div className={style['InitGuard']}>
      {fullName ? children : <InitialForm />}
    </div>
  )
}
