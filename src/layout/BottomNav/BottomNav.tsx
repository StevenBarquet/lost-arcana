// ---Dependencies
import type { ReactElement } from 'react'
import { NavLink } from 'react-router-dom'
// ---Styles
import style from './BottomNav.module.scss'

const TABS = [
  { clave: '', etiqueta: 'Practicar' },
  { clave: 'biblioteca', etiqueta: 'Biblioteca' },
  { clave: 'progreso', etiqueta: 'Progreso' },
] as const

export function BottomNav(): ReactElement {
  // -----------------------RENDER
  return (
    <nav className={style.BottomNav}>
      {TABS.map((tab) => (
        <NavLink
          key={tab.clave}
          to={`/${tab.clave}`}
          end
          className={({ isActive }) => (isActive ? 'enlace activo' : 'enlace')}
        >
          {tab.etiqueta}
        </NavLink>
      ))}
    </nav>
  )
}
