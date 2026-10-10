import { DAYJS_ES } from 'src/appConfig/dayjs-es'
import { IStoredFact } from './types'

const CAJAS = [
  { nextReview: 1 },
  { nextReview: 2 },
  { nextReview: 3 },
  { nextReview: 7 },
  { nextReview: 14 },
  { nextReview: 30 },
  { nextReview: 60 },
  { nextReview: 90 },
]

/** Calcula si un hecho necesita ser repasado */
export function needReview(storedFact: IStoredFact): boolean {
  const today = DAYJS_ES().startOf('day')
  const factDate = DAYJS_ES(storedFact.date).startOf('day')
  const currentBox = storedFact.box
  const nextReviewDate = factDate.add(CAJAS[currentBox].nextReview, 'day')

  return today.isSame(nextReviewDate) || today.isAfter(nextReviewDate)
}
