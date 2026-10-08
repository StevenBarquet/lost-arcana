// ---Dependencies
import { type ReactElement, useState } from 'react'
import { Drawer } from 'antd'
import { Icon } from '@iconify/react'
// ---Components
import { ColoredLi } from 'src/common/ColoredLi/ColoredLi'
// ---Config
import { allModules } from 'src/leitner-modules'
import { usePreferencesStore } from 'src/store/preferences'
import { useBoolean } from 'src/utils/hooks/useBoolean'
// ---Styles
import style from './QuizSelector.module.scss'

type ModuleOption = {
  key: string
  title: string
  icon: string
  factsCount: number
}

const MODULE_ICONS: Record<string, string> = {
  Elementos: 'solar:fire-bold-duotone',
  'Arcanos Mayores': 'solar:star-bold-duotone',
  Palos: 'solar:crown-bold-duotone',
}

const ALL_MODULES_OPTION: ModuleOption = {
  key: 'all',
  title: 'Todos los módulos',
  icon: 'solar:layers-bold-duotone',
  factsCount: allModules.reduce((acc, m) => acc + m.facts.length, 0),
}

const moduleOptions: ModuleOption[] = allModules.map((m) => ({
  key: m.metadata.title,
  title: m.metadata.title,
  icon: MODULE_ICONS[m.metadata.title] ?? 'solar:notebook-bold-duotone',
  factsCount: m.facts.length,
}))

export function QuizSelector(): ReactElement {
  // -----------------------CONSTS, HOOKS, STATES
  const practiceMode = usePreferencesStore((s) => s.practiceMode)
  const drawer = useBoolean()
  const [selectedModule, setSelectedModule] = useState<ModuleOption | null>(null)

  const options =
    practiceMode === 'reviews'
      ? [ALL_MODULES_OPTION, ...moduleOptions]
      : moduleOptions

  // -----------------------MAIN METHODS
  const handleSelect = (option: ModuleOption) => {
    setSelectedModule(option)
    drawer.setTrue()
  }

  // -----------------------HELPERS
  // -----------------------RENDER
  return (
    <div className={style['QuizSelector']}>
      <h3>
        <Icon icon="solar:widget-5-bold-duotone" width={22} />
        Elige un módulo
      </h3>

      <div className="module-list">
        {options.map((option, i) => (
          <ColoredLi key={option.key} index={i} className="module-card">
            <button className="card-btn" onClick={() => handleSelect(option)}>
              <span className="card-icon">
                <Icon icon={option.icon} width={24} />
              </span>
              <div className="card-text">
                <strong>{option.title}</strong>
                <small>{option.factsCount} cartas</small>
              </div>
              <Icon
                icon="solar:alt-arrow-right-linear"
                width={18}
                className="card-arrow"
              />
            </button>
          </ColoredLi>
        ))}
      </div>

      <Drawer
        title={selectedModule?.title ?? ''}
        placement="bottom"
        height="85vh"
        open={drawer.value}
        onClose={drawer.setFalse}
        className={style['ModuleDrawer']}
      >
        <div className="drawer-content">
          <Icon
            icon={selectedModule?.icon ?? 'solar:notebook-bold-duotone'}
            width={48}
          />
          <h2>{selectedModule?.title}</h2>
          <p>Contenido del módulo próximamente...</p>
        </div>
      </Drawer>
    </div>
  )
}
