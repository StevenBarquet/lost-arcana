// ---Dependencies
import dayjs from 'dayjs'
import { create, type StateCreator } from 'zustand'
import { devtools, persist, type PersistOptions } from 'zustand/middleware'

// ---Config
import { IStoredFact } from 'src/leitner-modules/types'

interface State {
  lastUpdate?: Date
  streak: number
  reviewedFacts: IStoredFact[]
}

const initialState: State = {
  reviewedFacts: [],
  streak: 0,
}

export interface LeitnerStore extends State {
  update: (data: Partial<State>) => void
  set: (data: State) => void
  updateStreak: () => void
  reset: () => void
}

// Si quieres ocupar logica compleja, puedes manejar las actions en otro archivo
const actions: StateCreator<LeitnerStore> = (set, get) => ({
  ...initialState,
  update: (data) => set((state) => ({ ...state, ...data })),
  set: (data) => set(() => data),
  updateStreak: () => {
    const { lastUpdate, streak } = get()
    const today = dayjs()
    if (lastUpdate && today.isSame(dayjs(lastUpdate), 'day')) return
    set({ streak: streak + 1, lastUpdate: today.toDate() })
  },
  reset: () => set(() => initialState),
})

// ------------BOILERPLATE-----
type PersistFn = (
  config: StateCreator<LeitnerStore>,
  options: PersistOptions<LeitnerStore>,
) => StateCreator<LeitnerStore>

const withPersist = (persist as PersistFn)(actions, {
  name: 'LeitnerStorageKey',
})

export const useLeitnerStore = create<LeitnerStore>()(
  devtools(withPersist, { name: 'Leitner' }),
)
