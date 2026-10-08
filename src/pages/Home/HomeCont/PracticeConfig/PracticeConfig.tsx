// ---Dependencies
import { type ReactElement } from 'react'
import { Icon } from '@iconify/react'
// ---Config
import { usePreferencesStore } from 'src/store/preferences'
// ---Styles
import style from './PracticeConfig.module.scss'

const MODES = [
  {
    key: 'reviews' as const,
    icon: 'solar:book-bold',
    title: 'Repasos pendientes',
    subtitle: '12 cartas listas hoy',
  },
  {
    key: 'new-modules' as const,
    icon: 'solar:stars-minimalistic-bold',
    title: 'Módulos nuevos',
    subtitle: 'Descubre algo distinto',
  },
]

export function PracticeConfig(): ReactElement {
  // -----------------------CONSTS, HOOKS, STATES
  const practiceMode = usePreferencesStore((s) => s.practiceMode)
  const update = usePreferencesStore((s) => s.update)

  // -----------------------MAIN METHODS
  // -----------------------HELPERS
  // -----------------------RENDER
  return (
    <div className={style['PracticeConfig']}>
      {MODES.map((mode) => (
        <button
          key={mode.key}
          className={`mode-card ${practiceMode === mode.key ? 'active' : ''}`}
          onClick={() => update({ practiceMode: mode.key })}
        >
          <span className="icon-circle">
            <Icon icon={mode.icon} width={20} />
          </span>
          <div className="text">
            <strong>{mode.title}</strong>
            <small>{mode.subtitle}</small>
          </div>
        </button>
      ))}
    </div>
  )
}
