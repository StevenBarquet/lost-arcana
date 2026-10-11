// ---Dependencies
import { type ReactElement } from 'react'
import { Tabs } from 'antd'
import { Icon } from '@iconify/react'
// ---Config
import { usePreferencesStore } from 'src/store/preferences'
import { swalApiConfirm } from 'src/utils/functions/alertUtils'
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

interface PracticeConfigProps {
  reviewsWithWarning?: boolean
}

export function PracticeConfig({
  reviewsWithWarning,
}: PracticeConfigProps): ReactElement {
  // -----------------------CONSTS, HOOKS, STATES
  const practiceMode = usePreferencesStore((s) => s.practiceMode)
  const update = usePreferencesStore((s) => s.update)

  // -----------------------MAIN METHODS
  function handleModeChange(key: string) {
    const newMode = key as typeof practiceMode

    if (reviewsWithWarning && newMode === 'reviews') {
      swalApiConfirm({
        callback: () => update({ practiceMode: newMode }),
        confirmMsg:
          'Repasar antes del intervalo de recuperación reduce la efectividad del aprendizaje. ¿Deseas continuar?',
      })
      return
    }

    update({ practiceMode: newMode })
  }

  // -----------------------HELPERS
  // -----------------------RENDER
  return (
    <div className={style['PracticeConfig']}>
      <Tabs
        activeKey={practiceMode}
        onChange={handleModeChange}
        items={TAB_ITEMS}
        centered
      />
    </div>
  )
}
