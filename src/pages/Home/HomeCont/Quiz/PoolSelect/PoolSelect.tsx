// ---Dependencies
import { type ReactElement, useState, useRef } from 'react'
import { Icon } from '@iconify/react'
// ---Config
import type { IQuiz } from 'src/leitner-modules/types'
import {
  filterByRelevance,
  normalizeAnswer,
} from 'src/utils/functions/logicUtils'
// ---Styles
import style from './PoolSelect.module.scss'

type PoolSelectProps = {
  quiz: IQuiz
  onAnswer: (isMistake: boolean) => void
  minChars?: number
}

export function PoolSelect({ quiz, onAnswer, minChars = 3 }: PoolSelectProps): ReactElement {
  // -----------------------CONSTS, HOOKS, STATES
  const options = quiz.options ?? []
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<string | null>(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const answered = selected !== null
  const isCorrect =
    answered && normalizeAnswer(selected) === normalizeAnswer(quiz.answer ?? '')
  const filtered =
    query.length >= minChars ? filterByRelevance(query, options) : []
  const showDropdown = dropdownOpen && filtered.length > 0 && !answered
  // -----------------------MAIN METHODS
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setQuery(val)
    setDropdownOpen(val.length >= minChars)
  }

  const handleSelectOption = (option: string) => {
    const correct =
      normalizeAnswer(option) === normalizeAnswer(quiz.answer ?? '')
    setSelected(option)
    setQuery(option)
    setDropdownOpen(false)
    onAnswer(!correct)
  }

  const handleBlur = () => {
    setTimeout(() => setDropdownOpen(false), 150)
  }
  // -----------------------HELPERS
  // -----------------------RENDER
  return (
    <div className={style['PoolSelect']}>
      <p className="question">{quiz.question}</p>

      <div
        className={`search-wrapper ${answered ? (isCorrect ? 'correct' : 'incorrect') : ''}`}
      >
        <div className="search-input">
          <Icon
            icon="solar:magnifer-linear"
            width={18}
            className="search-icon"
          />
          <input
            ref={inputRef}
            type="text"
            placeholder="Escribe al menos 3 caracteres..."
            value={query}
            onChange={handleInputChange}
            onFocus={() => query.length >= minChars && setDropdownOpen(true)}
            onBlur={handleBlur}
            disabled={answered}
          />
          {answered && (
            <Icon
              icon={
                isCorrect
                  ? 'solar:check-circle-bold-duotone'
                  : 'solar:close-circle-bold-duotone'
              }
              width={20}
              className={`result-icon ${isCorrect ? 'icon-correct' : 'icon-incorrect'}`}
            />
          )}
        </div>

        {showDropdown && (
          <ul className="dropdown">
            {filtered.map((option) => (
              <li key={option}>
                <button onMouseDown={() => handleSelectOption(option)}>
                  {option}
                </button>
              </li>
            ))}
          </ul>
        )}
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
