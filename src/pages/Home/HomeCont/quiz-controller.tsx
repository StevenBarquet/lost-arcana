// ---Dependencies
import { createContext, useContext, useState } from 'react'
// ---Custom Hooks
import { useBoolean } from 'src/utils/hooks/useBoolean'
// ---Config
import { usePreferencesStore } from 'src/store/preferences'
import { useLeitnerStore } from 'src/store/leitner'
import { allModules, type AllModuleTypes } from 'src/leitner-modules'
import type { IFacts } from 'src/leitner-modules/types'
import { needReview } from 'src/leitner-modules/algoritmo'

type ModuleOption = {
  key: string
  title: string
  icon: string
  factsCount: number
}

const PLACEHOLDER_MODULE: ModuleOption = {
  key: 'all',
  title: 'Todos los módulos',
  icon: 'solar:layers-bold-duotone',
  factsCount: 0,
}

export const useQuizCtrl = () => {
  // -----------------------CONSTS, HOOKS, STATES
  const practiceMode = usePreferencesStore((s) => s.practiceMode)
  const { reviewedFacts } = useLeitnerStore()
  const drawerState = useBoolean()
  const [selectedModule, setSelectedModule] =
    useState<ModuleOption>(PLACEHOLDER_MODULE)
  const [selectedFacts, setSelectedFacts] = useState<IFacts<AllModuleTypes>[]>(
    [],
  )

  const allFacts = allModules.flatMap((m) => m.facts)

  const allModulesOption: ModuleOption = {
    key: 'all',
    title: 'Todos los módulos',
    icon: 'solar:layers-bold-duotone',
    factsCount: factsForMode(allFacts).length,
  }

  const moduleOptions: ModuleOption[] = allModules.map((m) => ({
    key: m.metadata.key,
    title: m.metadata.title,
    icon: m.metadata.icon,
    factsCount: factsForMode(m.facts).length,
  }))

  const options =
    practiceMode === 'reviews'
      ? [allModulesOption, ...moduleOptions]
      : moduleOptions

  // -----------------------MAIN METHODS
  const handleSelectModule = (option: ModuleOption) => {
    const moduleFacts =
      option.key === 'all'
        ? allFacts
        : allModules.find((m) => m.metadata.key === option.key)!.facts

    setSelectedFacts(factsForMode(moduleFacts))
    setSelectedModule(option)
    drawerState.setTrue()
  }

  // -----------------------HELPERS
  function factsForMode(moduleFacts: IFacts<AllModuleTypes>[]) {
    if (practiceMode === 'reviews') {
      return moduleFacts.filter((f) => {
        const stored = reviewedFacts.find(
          (rf) => rf.moduleType === f.moduleType && rf.key === f.key,
        )
        return stored && needReview(stored)
      })
    }
    return moduleFacts.filter(
      (f) =>
        !reviewedFacts.some(
          (rf) => rf.moduleType === f.moduleType && rf.key === f.key,
        ),
    )
  }
  return {
    practiceMode,
    drawerState,
    selectedModule,
    options,
    selectedFacts,
    handleSelectModule,
  }
}

export type IQuizCtrl = ReturnType<typeof useQuizCtrl>

export const QuizCtrlContext = createContext<IQuizCtrl | null>(null)

export function useGetQuizCtrl() {
  const ctx = useContext(QuizCtrlContext)
  if (!ctx) {
    throw new Error(
      'useGetQuizCtrl must be used within QuizCtrlContextProvider',
    )
  }
  return ctx
}
