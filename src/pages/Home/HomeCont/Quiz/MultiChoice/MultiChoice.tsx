// ---Dependencies
import { type ReactElement, useState } from 'react'
import { Icon } from '@iconify/react'
// ---Config
import type { IQuiz } from 'src/leitner-modules/types'
import { shuffle } from 'src/utils/functions/logicUtils'
// ---Styles
import style from './MultiChoice.module.scss'

type MultiChoiceProps = {
  quiz: IQuiz
  onAnswer: (selectedAnswer: string) => void
}

export function MultiChoice({ quiz, onAnswer }: MultiChoiceProps): ReactElement {
  // -----------------------CONSTS, HOOKS, STATES
  const [shuffledOptions] = useState(() => shuffle(quiz.options ?? []))
  const [selected, setSelected] = useState<string | null>(null)
  const answered = selected !== null

  const isCorrect = (option: string) => option === quiz.answer
  // -----------------------MAIN METHODS
  const handleSelect = (option: string) => {
    if (answered) return
    setSelected(option)
    onAnswer(option)
  }
  // -----------------------HELPERS
  const getOptionStatus = (option: string) => {
    if (!answered) return ''
    if (option === selected && isCorrect(option)) return 'correct'
    if (option === selected && !isCorrect(option)) return 'incorrect'
    if (isCorrect(option)) return 'reveal'
    return 'dimmed'
  }

  const getOptionIcon = (option: string) => {
    if (!answered) return 'solar:round-alt-arrow-right-bold-duotone'
    if (option === selected && isCorrect(option)) return 'solar:check-circle-bold-duotone'
    if (option === selected && !isCorrect(option)) return 'solar:close-circle-bold-duotone'
    if (isCorrect(option)) return 'solar:check-circle-bold-duotone'
    return 'solar:minus-circle-bold-duotone'
  }
  // -----------------------RENDER
  return (
    <div className={style['MultiChoice']}>
      <p className="question">{quiz.question}</p>
      <div className="options">
        {shuffledOptions.map((option, i) => (
          <button
            key={option}
            className={`option-btn ${getOptionStatus(option)}`}
            onClick={() => handleSelect(option)}
            disabled={answered}
          >
            <span className="option-letter">{String.fromCharCode(65 + i)}</span>
            <span className="option-text">{option}</span>
            <Icon
              icon={getOptionIcon(option)}
              width={20}
              className="option-icon"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
