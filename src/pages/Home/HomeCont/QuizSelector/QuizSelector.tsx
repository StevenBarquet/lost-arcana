// ---Dependencies
import { type ReactElement } from 'react'
import { Icon } from '@iconify/react'
// ---Components
import { ColoredLi } from 'src/common/ColoredLi/ColoredLi'
// ---Config
import { useGetQuizCtrl } from '../quiz-controller'
// ---Styles
import style from './QuizSelector.module.scss'

export function QuizSelector(): ReactElement {
  const { options, handleSelectModule } = useGetQuizCtrl()
  // -----------------------CONSTS, HOOKS, STATES
  // -----------------------MAIN METHODS
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
            <button
              // type="text"
              className="card-btn"
              disabled={option.factsCount === 0}
              onClick={() => handleSelectModule(option)}
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
