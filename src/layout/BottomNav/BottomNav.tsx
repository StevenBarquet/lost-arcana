// ---Dependencies
import type { ReactElement } from 'react'
import { NavLink } from 'react-router-dom'
// ---Styles
import style from './BottomNav.module.scss'
import { usePreferencesStore } from 'src/store/preferences'

const TABS = [
  { clave: '', etiqueta: 'Practicar' },
  { clave: 'biblioteca', etiqueta: 'Biblioteca' },
  { clave: 'progreso', etiqueta: 'Progreso' },
] as const

export function BottomNav(): ReactElement {
  const update = usePreferencesStore((s) => s.update)
  const onLibrary = (key: string) => {
    if (key === 'biblioteca') {
      update({ practiceMode: 'new-modules' })
    }
  }

  // -----------------------RENDER
  return (
    <nav className={style.BottomNav}>
      {TABS.map((tab) => (
        <NavLink
          key={tab.clave}
          to={`/${tab.clave}`}
          end
          className={({ isActive }) => (isActive ? 'enlace activo' : 'enlace')}
          onClick={() => onLibrary(tab.clave)}
        >
          {tab.etiqueta}
        </NavLink>
      ))}
    </nav>
  )
}
