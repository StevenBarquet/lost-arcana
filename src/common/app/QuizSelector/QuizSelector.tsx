// ---Dependencies
import { type ReactElement } from 'react'
import { Icon } from '@iconify/react'
// ---Components
import { ColoredLi } from 'src/common/ColoredLi/ColoredLi'
// ---Styles
import style from './QuizSelector.module.scss'

type ModuleOption = {
  key: string
  title: string
  icon: string
  factsCount: number
}

type QuizSelectorProps = {
  options: ModuleOption[]
  onSelectModule: (option: ModuleOption) => void
  title?: string
  icon?: string
}

export function QuizSelector({
  options,
  onSelectModule,
  title = 'Elige un módulo',
  icon = 'solar:widget-5-bold-duotone',
}: QuizSelectorProps): ReactElement {
  // -----------------------CONSTS, HOOKS, STATES
  // -----------------------MAIN METHODS
  // -----------------------HELPERS
  // -----------------------RENDER
  return (
    <div className={style['QuizSelector']}>
      <h3>
        <Icon icon={icon} width={22} />
        {title}
      </h3>

      <div className="module-list">
        {options.map((option, i) => (
          <ColoredLi key={option.key} index={i} className="module-card">
            <button
              className="card-btn"
              disabled={option.factsCount === 0}
              onClick={() => onSelectModule(option)}
            >
              <span className="card-icon">
                <Icon icon={option.icon} width={24} />
              </span>
              <div className="card-text">
                <strong>{option.title}</strong>
                <small>
                  {option.factsCount === 0
                    ? 'Sin pendientes'
                    : `${option.factsCount} ejercicios`}
                </small>
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
    </div>
  )
}
