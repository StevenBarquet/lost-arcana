// ---Dependencies
import { type ReactElement } from 'react'
import { Drawer } from 'antd'
// ---Config
import { useGetQuizCtrl } from '../quiz-controller'
// ---Styles
import style from './Quiz.module.scss'
import { MultiChoice } from './MultiChoice/MultiChoice'
import { InputText } from './InputText/InputText'
import { PoolSelect } from './PoolSelect/PoolSelect'
import { PoolSelectMultiple } from './PoolSelectMultiple/PoolSelectMultiple'

// const randomIndex = (length: number) => Math.floor(Math.random() * length)

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
      <div className="drawer-content">
        <h2>{nextFact.title}</h2>
        <img
          src={`imagenes-modulos/${nextFact.moduleType}-${nextFact.key}.webp`}
        />
        {nextFact.quiz.map((quiz) => {
          if (quiz.quizType === 'multi-choice')
            return (
              <MultiChoice quiz={quiz} onAnswer={(str) => console.log(str)} />
            )
          if (quiz.quizType === 'input-text')
            return (
              <InputText quiz={quiz} onAnswer={(str) => console.log(str)} />
            )
          if (quiz.quizType === 'pool-select')
            return (
              <PoolSelect quiz={quiz} onAnswer={(str) => console.log(str)} />
            )
          if (quiz.quizType.startsWith('pool-select-multiple'))
            return (
              <PoolSelectMultiple
                quiz={quiz}
                onAnswer={(str) => console.log(str)}
              />
            )
        })}
      </div>
    </Drawer>
  )
}
