// ---Dependencies
import { useState, type ReactElement } from 'react'
// ---Styles
import style from './BottomNav.module.scss'

const TABS = [
  { clave: 'practica', etiqueta: 'Practicar' },
  { clave: 'biblioteca', etiqueta: 'Biblioteca' },
  { clave: 'progreso', etiqueta: 'Progreso' },
] as const

export function BottomNav(): ReactElement {
  // -----------------------CONSTS, HOOKS, STATES
  const [activo, setActivo] = useState<string>('practica')

  // -----------------------RENDER
  return (
    <nav className={style.BottomNav}>
      {TABS.map((tab) => (
        <a
          key={tab.clave}
          href={`#${tab.clave}`}
          className={activo === tab.clave ? 'enlace activo' : 'enlace'}
          onClick={() => setActivo(tab.clave)}
        >
          {tab.etiqueta}
        </a>
      ))}
    </nav>
  )
}
