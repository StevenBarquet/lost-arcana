// ---Dependencies
import { type ReactElement } from 'react'
// ---Styles
import style from './AppHeader.module.scss'
import { Icon } from '@iconify/react'
import { usePreferencesStore } from 'src/store/preferences'

/**
 * AppHeader Component:  Descripción del comportamiento...
 */
export function AppHeader(): ReactElement {
  // -----------------------CONSTS, HOOKS, STATES
  // const fechaHoy = DAYJS_ES().format('dddd, D [de] MMMM [de] YYYY')
  const { initials, count } = usePreferencesStore()

  // -----------------------MAIN METHODS
  // -----------------------HELPERS
  // -----------------------RENDER
  return (
    <div className={style['AppHeader']}>
      <div className="logo">
        <Icon icon="at-icons:sun" width={28} />
        <p>lost arcana</p>
        <p>El ritual de estudio</p>
      </div>

      {/* <p className="contextoFecha">{fechaHoy}</p> */}

      <div className="controles">
        <div className="racha">
          <Icon icon="mdi:fire" width={18} />
          <span>{count} dias</span>
        </div>
        <div className="avatar">{initials}</div>
      </div>
    </div>
  )
}
