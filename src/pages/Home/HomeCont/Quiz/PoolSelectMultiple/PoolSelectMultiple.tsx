// ---Dependencies
import { type ReactElement, useState, useRef } from 'react'
import { Icon } from '@iconify/react'
// ---Config
import type { IQuiz } from 'src/leitner-modules/types'
import {
  filterByRelevance,
  flattenComaSep,
  normalizeAnswer,
} from 'src/utils/functions/logicUtils'
// ---Styles
import style from './PoolSelectMultiple.module.scss'

const MIN_CHARS = 3

type PoolSelectMultipleProps = {
  quiz: IQuiz
  onAnswer: (selectedAnswers: string[]) => void
}

export function PoolSelectMultiple({
  quiz,
  onAnswer,
}: PoolSelectMultipleProps): ReactElement {
  // -----------------------CONSTS, HOOKS, STATES
  const rawOptions = quiz.options ?? []
  const options =
    quiz.quizType === 'pool-select-multiple-from-coma-sep'
      ? flattenComaSep(rawOptions)
      : rawOptions
  const expectedCount = quiz.answers?.length ?? 1

  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const available = options.filter(
    (opt) => !selected.some((s) => normalizeAnswer(s) === normalizeAnswer(opt)),
  )
  const filtered =
    query.length >= MIN_CHARS ? filterByRelevance(query, available) : []
  const showDropdown = dropdownOpen && filtered.length > 0 && !submitted
  const isFull = selected.length >= expectedCount
  // -----------------------MAIN METHODS
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setQuery(val)
    setDropdownOpen(val.length >= MIN_CHARS)
  }

  const handleSelectOption = (option: string) => {
    const next = [...selected, option]
    setSelected(next)
    setQuery('')
    setDropdownOpen(false)
    inputRef.current?.focus()
  }

  const handleRemove = (option: string) => {
    if (submitted) return
    setSelected(selected.filter((s) => s !== option))
  }

  const handleSubmit = () => {
    if (selected.length === 0 || submitted) return
    setSubmitted(true)
    onAnswer(selected)
  }

  const handleBlur = () => {
    setTimeout(() => setDropdownOpen(false), 150)
  }
  // -----------------------HELPERS
  const getChipStatus = (option: string) => {
    if (!submitted) return 'pending'
    const correct = quiz.answers?.some(
      (a) => normalizeAnswer(a) === normalizeAnswer(option),
    )
    return correct ? 'correct' : 'incorrect'
  }

  const missedAnswers = submitted
    ? (quiz.answers ?? []).filter(
        (a) =>
          !selected.some((s) => normalizeAnswer(s) === normalizeAnswer(a)),
      )
    : []
  // -----------------------RENDER
  return (
    <div className={style['PoolSelectMultiple']}>
      <p className="question">{quiz.question}</p>

      <div className="counter">
        <Icon icon="solar:checklist-minimalistic-bold-duotone" width={18} />
        <span>
          {selected.length} de {expectedCount}
        </span>
      </div>

      {selected.length > 0 && (
        <div className="selected-pool">
          {selected.map((option) => (
            <span key={option} className={`chip ${getChipStatus(option)}`}>
              {option}
              {!submitted && (
                <button
                  className="chip-remove"
                  onClick={() => handleRemove(option)}
                >
                  <Icon icon="solar:close-circle-bold" width={14} />
                </button>
              )}
              {submitted && getChipStatus(option) === 'correct' && (
                <Icon
                  icon="solar:check-circle-bold-duotone"
                  width={14}
                  className="chip-icon"
                />
              )}
              {submitted && getChipStatus(option) === 'incorrect' && (
                <Icon
                  icon="solar:close-circle-bold-duotone"
                  width={14}
                  className="chip-icon"
                />
              )}
            </span>
          ))}
        </div>
      )}

      {!submitted && (
        <div className="search-wrapper">
          <div className="search-input">
            <Icon
              icon="solar:magnifer-linear"
              width={18}
              className="search-icon"
            />
            <input
              ref={inputRef}
              type="text"
              placeholder={
                isFull
                  ? 'Todas seleccionadas — confirma'
                  : 'Escribe al menos 3 caracteres...'
              }
              value={query}
              onChange={handleInputChange}
              onFocus={() =>
                query.length >= MIN_CHARS && setDropdownOpen(true)
              }
              onBlur={handleBlur}
              disabled={isFull}
              autoFocus
            />
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
      )}

      {!submitted && selected.length > 0 && (
        <button className="confirm-btn" onClick={handleSubmit}>
          <Icon icon="solar:check-read-bold-duotone" width={20} />
          <span>Confirmar selección</span>
        </button>
      )}

      {submitted && missedAnswers.length > 0 && (
        <div className="answer-reveal">
          <Icon icon="solar:lightbulb-bolt-bold-duotone" width={18} />
          <span>
            Faltó: {missedAnswers.join(', ')}
          </span>
        </div>
      )}
    </div>
  )
}
