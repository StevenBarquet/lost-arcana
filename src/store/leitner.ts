import { IStoredFact } from 'src/leitner-modules/types'
import { create, type StateCreator } from 'zustand'
import { devtools, persist, type PersistOptions } from 'zustand/middleware'

interface State {
  reviewedFacts: IStoredFact[]
}

const initialState: State = {
  reviewedFacts: [],
}

export interface LeitnerStore extends State {
  update: (data: Partial<State>) => void
  set: (data: State) => void
  reset: () => void
}

// Si quieres ocupar logica compleja, puedes manejar las actions en otro archivo
const actions: StateCreator<LeitnerStore> = (set) => ({
  ...initialState,
  update: (data) => set((state) => ({ ...state, ...data })),
  set: (data) => set(() => data),
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
