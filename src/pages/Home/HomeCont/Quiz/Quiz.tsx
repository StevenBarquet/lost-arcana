// ---Dependencies
import { type ReactElement } from 'react'
import { Drawer } from 'antd'
import { Icon } from '@iconify/react'
// ---Components
import { MultiChoice } from './MultiChoice/MultiChoice'
import { InputText } from './InputText/InputText'
import { PoolSelect } from './PoolSelect/PoolSelect'
import { PoolSelectMultiple } from './PoolSelectMultiple/PoolSelectMultiple'
// ---Config
import { useGetQuizCtrl } from '../quiz-controller'
import { motionComps, MOTION_FADE_IN } from 'src/utils/functions/motionUtils'
// ---Styles
import style from './Quiz.module.scss'

export function Quiz(): ReactElement {
  const {
    drawerState,
    selectedModule,
    currentFact,
    allAnswered,
    someAnswered,
    handleAnswer,
    onClose,
    onNextFact,
    onSkip,
  } = useGetQuizCtrl()
  // -----------------------CONSTS, HOOKS, STATES
  // -----------------------MAIN METHODS
  // -----------------------HELPERS
  // -----------------------RENDER
  if (!currentFact)
    return (
      <Drawer
        title={selectedModule.title}
        placement="bottom"
        height="90vh"
        open={drawerState.value}
        onClose={onClose}
        className={style['Quiz']}
        destroyOnHidden
      >
        <motionComps.Div className="sinPendientes" {...MOTION_FADE_IN}>
          <div className="icon-glow">
            <Icon icon="line-md:confirm-circle" width={64} />
          </div>
          <h2>¡Todo al día!</h2>
          <p>No hay ejercicios pendientes en este módulo.</p>
        </motionComps.Div>
      </Drawer>
    )
  return (
    <Drawer
      title={selectedModule.title}
      placement="bottom"
      height="90vh"
      open={drawerState.value}
      onClose={onClose}
      className={style['Quiz']}
      destroyOnHidden
    >
      <div className="fact-header">
        <div className="image-frame">
          <img
            src={`imagenes-modulos/${currentFact.moduleType}-${currentFact.key}.webp`}
            alt={currentFact.title}
          />
        </div>
        <div className="title-row">
          <h2>{currentFact.title}</h2>
          {someAnswered ? null : (
            <button className="skip-btn" type="button" onClick={onSkip}>
              <Icon icon="qlementine-icons:jump-over-16" width={14} />
              Saltar
            </button>
          )}
        </div>
      </div>

      <div className="quiz-list">
        {currentFact.quiz.map((quiz, i) => {
          const quizKey = `${currentFact.moduleType}-${currentFact.key}-${i}`
          if (quiz.quizType === 'multi-choice')
            return (
              <MultiChoice key={quizKey} quiz={quiz} onAnswer={handleAnswer} />
            )
          if (quiz.quizType === 'input-text')
            return (
              <InputText key={quizKey} quiz={quiz} onAnswer={handleAnswer} />
            )
          if (quiz.quizType === 'pool-select')
            return (
              <PoolSelect key={quizKey} quiz={quiz} onAnswer={handleAnswer} />
            )
          if (quiz.quizType.startsWith('pool-select-multiple'))
            return (
              <PoolSelectMultiple
                key={quizKey}
                quiz={quiz}
                onAnswer={handleAnswer}
              />
            )
        })}
      </div>

      <button
        className="next-btn"
        type="button"
        disabled={!allAnswered}
        onClick={onNextFact}
      >
        Siguiente
        <Icon icon="solar:arrow-right-linear" width={18} />
      </button>
    </Drawer>
  )
}
