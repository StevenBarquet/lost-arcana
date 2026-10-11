// ---Dependencies
import { type ReactElement } from 'react'
import { Tabs } from 'antd'
import { Icon } from '@iconify/react'
// ---Config
import { usePreferencesStore } from 'src/store/preferences'
// ---Styles
import style from './PracticeConfig.module.scss'

const MODES = [
  {
    key: 'reviews' as const,
    icon: 'solar:book-bold',
    title: 'Repasos',
  },
  {
    key: 'new-modules' as const,
    icon: 'solar:stars-minimalistic-bold',
    title: 'Módulos nuevos',
  },
]

const TAB_ITEMS = MODES.map((mode) => ({
  key: mode.key,
  label: (
    <span className="tab-label">
      <Icon icon={mode.icon} width={17} />
      {mode.title}
    </span>
  ),
}))

export function PracticeConfig(): ReactElement {
  // -----------------------CONSTS, HOOKS, STATES
  const practiceMode = usePreferencesStore((s) => s.practiceMode)
  const update = usePreferencesStore((s) => s.update)

  // -----------------------MAIN METHODS
  // -----------------------HELPERS
  // -----------------------RENDER
  return (
    <div className={style['PracticeConfig']}>
      <Tabs
        activeKey={practiceMode}
        onChange={(key) => update({ practiceMode: key as typeof practiceMode })}
        items={TAB_ITEMS}
        centered
      />
    </div>
  )
}
