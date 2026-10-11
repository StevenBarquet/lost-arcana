// ---Dependencies
import { type ReactElement } from 'react'
import { Drawer } from 'antd'
// ---Components
import { MultiChoice } from './MultiChoice/MultiChoice'
import { InputText } from './InputText/InputText'
import { PoolSelect } from './PoolSelect/PoolSelect'
import { PoolSelectMultiple } from './PoolSelectMultiple/PoolSelectMultiple'
// ---Config
import { useGetQuizCtrl } from '../quiz-controller'
// ---Styles
import style from './Quiz.module.scss'

export function Quiz(): ReactElement {
  const { drawerState, selectedModule, selectedFacts } = useGetQuizCtrl()
  // -----------------------CONSTS, HOOKS, STATES
  const nextFact = selectedFacts[0]

  // -----------------------MAIN METHODS
  // -----------------------HELPERS
  // -----------------------RENDER
  return (
    <Drawer
      title={selectedModule.title}
      placement="bottom"
      height="90vh"
      open={drawerState.value}
      onClose={drawerState.setFalse}
      className={style['Quiz']}
      destroyOnHidden
    >
      <div className="fact-header">
        <div className="image-frame">
          <img
            src={`imagenes-modulos/${nextFact.moduleType}-${nextFact.key}.webp`}
            alt={nextFact.title}
          />
        </div>
        <h2>{nextFact.title}</h2>
        {/* {nextFact.hint && <p className="hint">{nextFact.hint}</p>} */}
      </div>

      <div className="quiz-list">
        {nextFact.quiz.map((quiz, i) => {
          if (quiz.quizType === 'multi-choice')
            return (
              <MultiChoice
                key={i}
                quiz={quiz}
                onAnswer={(str) => console.log(str)}
              />
            )
          if (quiz.quizType === 'input-text')
            return (
              <InputText
                key={i}
                quiz={quiz}
                onAnswer={(str) => console.log(str)}
              />
            )
          if (quiz.quizType === 'pool-select')
            return (
              <PoolSelect
                key={i}
                quiz={quiz}
                onAnswer={(str) => console.log(str)}
              />
            )
          if (quiz.quizType.startsWith('pool-select-multiple'))
            return (
              <PoolSelectMultiple
                key={i}
                quiz={quiz}
                onAnswer={(str) => console.log(str)}
              />
            )
        })}
      </div>
    </Drawer>
  )
}
