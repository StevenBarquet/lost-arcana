// ---Dependencies
import { type ReactElement, useState } from 'react'
import { Icon } from '@iconify/react'
// ---Config
import type { IQuiz } from 'src/leitner-modules/types'
import { normalizeAnswer } from 'src/utils/functions/logicUtils'
// ---Styles
import style from './InputText.module.scss'

type InputTextProps = {
  quiz: IQuiz
  onAnswer: (selectedAnswer: string) => void
}

export function InputText({ quiz, onAnswer }: InputTextProps): ReactElement {
  // -----------------------CONSTS, HOOKS, STATES
  const [value, setValue] = useState('')
  const [answered, setAnswered] = useState(false)

  const isCorrect = answered && normalizeAnswer(value) === normalizeAnswer(quiz.answer ?? '')
  const trimmed = value.trim()
  // -----------------------MAIN METHODS
  const handleSubmit = () => {
    if (!trimmed || answered) return
    setAnswered(true)
    onAnswer(trimmed)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit()
  }
  // -----------------------HELPERS
  // -----------------------RENDER
  return (
    <div className={style['InputText']}>
      <p className="question">{quiz.question}</p>

      <div className={`input-wrapper ${answered ? (isCorrect ? 'correct' : 'incorrect') : ''}`}>
        <input
          type="text"
          placeholder="Escribe tu respuesta..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={answered}
          autoFocus
        />
        <button
          className="submit-btn"
          onClick={handleSubmit}
          disabled={!trimmed || answered}
        >
          <Icon
            icon={
              !answered
                ? 'solar:arrow-right-bold'
                : isCorrect
                  ? 'solar:check-circle-bold-duotone'
                  : 'solar:close-circle-bold-duotone'
            }
            width={20}
          />
        </button>
      </div>

      {answered && !isCorrect && (
        <div className="answer-reveal">
          <Icon icon="solar:lightbulb-bolt-bold-duotone" width={18} />
          <span>{quiz.answer}</span>
        </div>
      )}
    </div>
  )
}
